package bitcamp.app.controller;

import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicReference;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import bitcamp.app.service.BoardService;
import bitcamp.app.service.LikeService;
import bitcamp.app.service.MemberService;
import bitcamp.app.service.PointService;
import bitcamp.app.vo.Board;
import bitcamp.app.vo.GeneratedImg;
import bitcamp.app.vo.Member;
import bitcamp.util.ErrorCode;
import bitcamp.util.GsonFilter;
import bitcamp.util.LocalDateTimeAdapter;
import bitcamp.util.NaverClovaSummary;
import bitcamp.util.NaverPapagoTranslation;
import bitcamp.util.RestResult;
import bitcamp.util.RestStatus;
import bitcamp.util.TagExtract;
import jakarta.servlet.http.HttpSession;

@RestController
// @RequestMapping("/member")
@RequestMapping("/boards")
public class BoardController {

  Logger log = LogManager.getLogger(getClass());

  {
    log.trace("BoardController 생성됨!");
  }

  @Autowired private MemberService memberService;
  @Autowired private BoardService boardService;
  @Autowired private LikeService likeService;
  @Autowired private PointService pointService;
  @Autowired private NaverClovaSummary naverClovaSummary;
  @Autowired private NaverPapagoTranslation naverPapagoTranslation;
  @Autowired private TagExtract tagExtract;
  @Autowired private SseController sseController;

  @PostMapping
  public Object insert(int writerNo, String originContent, HttpSession session) {

    AtomicReference<String> summaryContentAtomicRef = new AtomicReference<>();

    Member member = memberService.get(writerNo);

    if (member.getIsGenerating() == 1) {
      return new RestResult()
          .setErrorCode(ErrorCode.rest.DUPLICATE_DATA)
          .setStatus(RestStatus.FAILURE);
    }

    member.setIsGenerating(1);
    memberService.updateIsGenerating(member);

    Member loginUser = (Member) session.getAttribute("loginUser");
    loginUser.setIsGenerating(1);
    session.setAttribute("loginUser", loginUser);

    RestResult result = CompletableFuture.supplyAsync(
        () -> naverClovaSummary.summarize(originContent))
        .thenApply(summary -> {
          String filteredSummary = GsonFilter.summary(summary);
          // log.info("filteredSummary >>> " + filteredSummary);
          summaryContentAtomicRef.set(filteredSummary);
          return filteredSummary;
        })
        .thenApply(summaryContent -> naverPapagoTranslation.translate(summaryContent))
        .thenApply(GsonFilter::translate)
        .thenApply(transContent -> {
          log.info("transContent >>> " + transContent);

          String fileName = UUID.randomUUID().toString() + ".png";

          HttpClient httpClient = HttpClient.newHttpClient();
          String url = "http://223.130.129.169:8085/generate";  // String url = "http://localhost:8085/generate";
          String requestBody = "transContent=" + URLEncoder.encode(transContent, StandardCharsets.UTF_8) + "&fileName=" + fileName;
          String fileUrl = "";

          HttpRequest httpRequest = HttpRequest.newBuilder()
              .uri(URI.create(url))
              .header("Content-Type", "application/x-www-form-urlencoded")
              .POST(HttpRequest.BodyPublishers.ofString(requestBody))
              .build();

          AtomicInteger count = new AtomicInteger(0);

          ScheduledExecutorService scheduler = Executors.newSingleThreadScheduledExecutor();
          scheduler.scheduleAtFixedRate(() -> {
            int currentCount = count.incrementAndGet();

            if (currentCount >= 180) {
              scheduler.shutdown();

            } else {
              Map<String, String> sseMap = new HashMap<>();
              sseMap.put("status", "process");
              sseMap.put("message", "GPU Server 이미지 생성 중");
              sseMap.put("count", String.valueOf(currentCount));
              sseController.sendMessageToAll(sseMap);
            }
          }, 0, 1, TimeUnit.SECONDS);

          try {
            // GPU 로 요청 보냄
            HttpResponse<String> httpResponse = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString());

            // GPU Server 응답 옴!
            log.info("Response status code >>> " + httpResponse.statusCode());

            if (httpResponse.statusCode() != 200) {
              throw new RuntimeException("GPU Server 응답 statusCode 200 아님!");
            }

            log.info("Response body >>> " + httpResponse.body());
            RestResult restResult = new Gson().fromJson(httpResponse.body(), RestResult.class);

            if (RestStatus.SUCCESS.equals(restResult.getStatus())) {
              fileUrl = (String) restResult.getData();

              String summaryContent = summaryContentAtomicRef.get();
              // log.info("summaryContent >>> " + summaryContent);

              String koContent = tagExtract.koToEn(originContent);
              HashSet<String> tags = tagExtract.extract(koContent);
              HashSet<String> koLists = new HashSet<>();

              for (String tag : tags) {
                String originTag = tagExtract.enToKo(tag).replace(".", "").replaceAll(" ", "");
                String modifyTag = "";
                modifyTag += "#" + originTag;
                koLists.add(modifyTag);
              }

              Board board = new Board();
              board.setWriter(member);
              board.setOriginContent(originContent);
              board.setSummaryContent(summaryContent);
              board.setTransContent(transContent);
              //                  board.setTag(tag);

              GeneratedImg generatedImg = new GeneratedImg();
              generatedImg.setFilename(fileUrl);
              board.setGeneratedImg(generatedImg);

              // 게시글 DB 에 업로드
              boardService.add(board);

              // 태그 업로드
              for (String koList : koLists) {
                Map<String, Object> paramMap = new HashMap<>();
                paramMap.put("boardNo", board.getBoardNo());
                paramMap.put("tag", koList);
                boardService.addTag(paramMap);
              }

              //사용자에게 완료 표시 및 알람
              log.info("DB에 게시글 및 파일 업로드 완료함");

              scheduler.shutdown();

              Map<String, String> sseMap = new HashMap<>();
              sseMap = new HashMap<>();
              sseMap.put("status", "success");
              sseMap.put("message", "GPU Server 이미지 생성, DB에 게시글, 파일 업로드 완료");

              Gson gson = new GsonBuilder()
                  .registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapter())
                  .create();
              Board boardGet = boardService.get(board.getBoardNo());
              sseMap.put("boardJson", gson.toJson(boardGet));
              sseController.sendMessageToAll(sseMap);

              return new RestResult()
                  .setStatus(RestStatus.SUCCESS);

            } else {

              log.error("GPU Server 이미지 생성 중 에러 발생! Error code: " + restResult.getErrorCode());

              throw new RuntimeException("GPU Server 이미지 생성 중 에러 발생!");
            }

          } catch (Exception e) {

            log.error("GPU Server 에러 발생!: ", e);

            scheduler.shutdown();

            Map<String, String> sseMap = new HashMap<>();
            sseMap = new HashMap<>();
            sseMap.put("status", "failure");
            sseMap.put("message", "GPU Server 이미지 생성 중 에러 발생");
            sseController.sendMessageToAll(sseMap);

            return new RestResult()
                .setErrorCode(ErrorCode.rest.SERVER_EXCEPTION)
                .setStatus(RestStatus.FAILURE);
          }

        }).join();

    member.setIsGenerating(0);
    memberService.updateIsGenerating(member);

    loginUser = (Member) session.getAttribute("loginUser");
    loginUser.setIsGenerating(0);
    session.setAttribute("loginUser", loginUser);

    return result;

  }

  @GetMapping
  @ResponseBody
  public Map<String, Object> list(String keyword, int currentPage, HttpSession session) {

    String sort = (String) session.getAttribute("sort");
    Map<String, Object> resultMap = new HashMap<>();

    if (Objects.equals(sort, "hot")) {
      List<Board> list = boardService.listHot();
      session.removeAttribute("sort");

      resultMap.put("state", false);
      resultMap.put("data", list);
      return resultMap;

    } else if (Objects.equals(sort, "recent")) {
      List<Board> list = boardService.listRecent();
      session.removeAttribute("sort");

      resultMap.put("state", false);
      resultMap.put("data", list);
      return resultMap;

    } else if (Objects.equals(sort, "follow")) {
      Member loginUser = (Member) session.getAttribute("loginUser");

      List<Board> list = boardService.listFollow(loginUser.getNo());
      session.removeAttribute("sort");

      resultMap.put("state", true);
      resultMap.put("data", list);
      return resultMap;
    }

    String key = (String) session.getAttribute("keyword");
    Map<Object, Object> page = new HashMap<Object, Object>();

    if (key != null) {
      resultMap.put("key", false);
      page.put("pageSize", 1000000);
    } else {
      resultMap.put("key", true);
      page.put("pageSize", 10);
    }

    page.put("keyword", key);
    page.put("offset", (currentPage - 1) * 10);

    List<Board> list = boardService.list(page);

    session.removeAttribute("keyword");

    for (Board b : list) {
      b.setLikeCnt(likeService.countLiker(b.getBoardNo(), "board"));
    }

    resultMap.put("state", true);
    resultMap.put("data", list);
    return resultMap;
  }

  @GetMapping("{no}")
  public Board view(@PathVariable int no) {

    return boardService.get(no);
  }

  @GetMapping("tag/{no}")
  public List<Board> findTag(@PathVariable int no) {

    return boardService.listTag(no);
  }

  @GetMapping("auth")
  public boolean authCheck(HttpSession session) {

    Member loginUser = (Member) session.getAttribute("loginUser");

    if (loginUser != null) {
      return true;
    }
    return false;
  }

  @PostMapping("keyword")
  public Object keyword(String keyword, HttpSession session) {
    if (keyword != null) {
      session.setAttribute("keyword", keyword);

    }
    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }

  @PostMapping("sort")
  public Object sort(String sort, HttpSession session) {

    if (sort != null) {
      session.setAttribute("sort", sort);
    }

    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }

  @DeleteMapping("/{boardNo}")
  public void delete(@PathVariable int boardNo, @RequestBody List<Integer> replyNos) {
    boardService.deleteBoard(boardNo, replyNos);
  }

}
