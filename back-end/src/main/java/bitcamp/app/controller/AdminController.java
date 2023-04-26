package bitcamp.app.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.app.service.BoardService;
import bitcamp.app.service.LikeService;
import bitcamp.app.service.MemberService;
import bitcamp.app.service.ObjectStorageService;
import bitcamp.app.service.PointService;
import bitcamp.app.service.ReplyService;
import bitcamp.app.service.ReportService;
import bitcamp.app.vo.Board;
import bitcamp.app.vo.Member;
import bitcamp.util.ErrorCode;
import bitcamp.util.RestResult;
import bitcamp.util.RestStatus;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/admin")
public class AdminController {
  @Autowired private MemberService memberService;
  @Autowired private BoardService boardService;
  @Autowired private LikeService likeService;
  @Autowired private ReplyService replyService;
  @Autowired private PointService pointService;
  @Autowired private ReportService reportService;

  @Autowired private ObjectStorageService objectStorageService;
  private String bucketName = "bitcamp-bucket04-member-photo";

  @GetMapping()
  public Object test() {
    return memberService.list(null);
  }

  @GetMapping("{no}")
  public Object view(@PathVariable int no) {
    Member member = memberService.get(no);
    if (member != null) {
      return new RestResult()
          .setStatus(RestStatus.SUCCESS)
          .setData(member);
    } else {
      return new RestResult()
          .setStatus(RestStatus.FAILURE)
          .setErrorCode(ErrorCode.rest.NO_DATA);
    }
  }

  @GetMapping("member/{no}")
  public int findPoint(@PathVariable int no) {

    return pointService.findPoint(no);
  }

  @PutMapping("member/{no}/accountState")
  public Object updateAccountState(
      @PathVariable int no,
      @RequestBody Map<String, String> paramMap,
      HttpSession session) {

    System.out.println("updateAccountState 실행");
    System.out.println("state >>> " + paramMap.get("state"));

    memberService.updateAccountState(no, Integer.parseInt(paramMap.get("state"))); // 필요한 속성만 전달

    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }

  @GetMapping("/comment")
  public Object test3() {
    return replyService.list();
  }

  @GetMapping("/board") // Feed에 사용
  @ResponseBody
  public Map<String, Object> list(HttpSession session) {
    session.setAttribute("sort", "recent"); // sort 세션 속성을 "recent"로 설정
    Map<String, Object> resultMap = new HashMap<>();

    List<Board> list = boardService.listRecent();
    session.removeAttribute("sort");

    resultMap.put("state", false);
    resultMap.put("data", list);

    for (Board b : list) {
      b.setLikeCnt(likeService.countLiker(b.getBoardNo(), "board"));
    }

    resultMap.put("state", true);
    resultMap.put("data", list);
    return resultMap;
  }

  @GetMapping("/board/{no}")
  public Board viewBoard(@PathVariable int no) {

    return boardService.get(no);
  }

  @GetMapping("/board/tag/{no}")
  public List<Board> findTag(@PathVariable int no) {

    return boardService.listTag(no);
  }

  @DeleteMapping("/board/delete/{boardNo}")
  public void delete(@PathVariable int boardNo, @RequestBody List<Integer> replyNos) {
    boardService.deleteBoard(boardNo, replyNos);
  }

  @GetMapping("/board/report/{no}")
  public int findByBoardNo(@PathVariable int no) {

    return reportService.findByBoardNo(no);
  }

  @GetMapping("/user")
  public Object user(HttpSession session) {

    Member loginUser = (Member) session.getAttribute("loginUser");

    if (loginUser != null) {
      return new RestResult()
          .setStatus(RestStatus.SUCCESS)
          .setData(loginUser);
    } else {
      return new RestResult()
          .setStatus(RestStatus.FAILURE);
    }
  }


}

