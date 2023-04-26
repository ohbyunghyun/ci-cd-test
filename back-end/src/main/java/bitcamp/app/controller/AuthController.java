package bitcamp.app.controller;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.app.service.MemberService;
import bitcamp.app.service.PointService;
import bitcamp.app.vo.Member;
import bitcamp.util.ErrorCode;
import bitcamp.util.RestResult;
import bitcamp.util.RestStatus;
import bitcamp.util.StringChecker;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/auth")
public class AuthController {

  Logger log = LogManager.getLogger(getClass());

  {
    log.trace("AuthController 생성됨!");
  }

  @Autowired private MemberService memberService;
  @Autowired private PointService pointService;

  @GetMapping("checkemail")
  public Object checkemail(String email) {
    Member member = memberService.getByEmail(email);

    if (member != null) {
      return new RestResult()
          .setData(member)
          .setStatus(RestStatus.SUCCESS);
    } else {
      return new RestResult()
          .setData(ErrorCode.rest.NO_DATA)
          .setStatus(RestStatus.FAILURE);
    }
  }

  @GetMapping("checknickname")
  public Object checknickname(String nickname) {
    Member member = memberService.getByNickname(nickname);

    if (member != null) {
      return new RestResult()
          .setData(member)
          .setStatus(RestStatus.SUCCESS);
    } else {
      return new RestResult()
          .setData(ErrorCode.rest.NO_DATA)
          .setStatus(RestStatus.FAILURE);
    }
  }

  @PostMapping("signup")
  public Object signup(
      String nickname,
      String email,
      String password,
      HttpSession session) throws Exception {

    if(nickname.length() <= 50 ||
        email.contains("@") ||
        StringChecker.isValidPassword(password) ||
        StringChecker.isValidNickname(nickname)) {

      String token = UUID.randomUUID().toString();
      String authCode = UUID.randomUUID().toString().substring(0, 16);

      Member member = new Member();
      member.setNickname(nickname);
      member.setEmail(email);
      member.setPassword(password);
      member.setToken(token);
      member.setLink("artify");
      member.setAuthCode(authCode);

      memberService.add(member);
      pointService.signupInsert(member.getNo());

      return new RestResult()
          .setStatus(RestStatus.SUCCESS);
    }

    return new RestResult()
        .setErrorCode(ErrorCode.rest.CONTROLLER_EXCEPTION)
        .setStatus(RestStatus.FAILURE);
  }

  @PostMapping("login")
  public Object login(
      String email,
      String password,
      HttpSession session) {

    Member m = memberService.get(email, password);

    if (m != null) {
      if (m.getAccountState() == 1) {
        return new RestResult()
            .setErrorCode(ErrorCode.rest.UNVERIFIED)
            .setStatus(RestStatus.FAILURE);
      }
      session.setAttribute("loginUser", m);

      //Member m = (Member) session.getAttribute("loginUser");

      LocalDateTime now = LocalDateTime.now(); // 현재 시간
      LocalDateTime resetTime = LocalDateTime.of(now.getYear(), now.getMonth(), now.getDayOfMonth(), 0, 0, 0);  // 매일 00시에 리셋되는 기준 시간

      if (m.getLastLoginDt() == null || m.getLastLoginDt().isBefore(resetTime)) {  // 기준 시간 이후에 로그인한 경우
        pointService.loginInsert(m.getNo());
      }
      memberService.lastLoginUpdate(m.getNo());

      //      System.out.println(m.getNo());
      //      System.out.println(m.getAuthLevel());

      return new RestResult()
          .setData(m)
          .setStatus(RestStatus.SUCCESS);

    } else {
      return new RestResult()
          .setErrorCode(ErrorCode.rest.NO_DATA)
          .setStatus(RestStatus.FAILURE);
    }
  }

  @GetMapping("logout")
  public Object logout(HttpSession session) {
    session.invalidate();

    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }

  @GetMapping("user")
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

  @GetMapping("verify")
  public Object verifyEmail(HttpSession session, @RequestParam String token) {
    Member member = memberService.updateByVerifyToken(token);

    if (member != null) {
      session.setAttribute("loginUser", member);

      return new RestResult()
          .setStatus(RestStatus.SUCCESS);
    } else {
      return new RestResult()
          .setErrorCode(ErrorCode.rest.NO_DATA)
          .setStatus(RestStatus.FAILURE);
    }
  }

  @PostMapping("naverlogin")
  public Object naverlogin(@RequestBody Map<String, String> params, HttpSession session) {

    //    log.info("params >>> " + params.toString());  //{access_token=AAAAOK3YZUQo0huTlz-hhCJuoC8c2oqBXuNgug8SJ9b9hKMAVsrDbQFrZ1ZEsW2pGT6hw3ouHoNIF2x1BYfjUcqtDWQ, state=4b53e1ff-4b37-44f4-b857-eb93287b5f70, token_type=bearer, expires_in=3600}
    //    log.info(params.get("access_token"));

    String token = params.get("access_token"); // 네이버 로그인 접근 토큰
    String header = "Bearer " + token; // Bearer 다음에 공백 추가
    String apiURL = "https://openapi.naver.com/v1/nid/me";

    try {
      URL url = new URL(apiURL);
      HttpURLConnection con = (HttpURLConnection) url.openConnection();
      con.setRequestMethod("POST");
      con.setRequestProperty("Authorization", header);

      int responseCode = con.getResponseCode();
      BufferedReader br;

      if (responseCode == 200) { // 정상 호출
        br = new BufferedReader(new InputStreamReader(con.getInputStream()));

      } else {  // 에러 발생
        br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
      }

      String inputLine;
      StringBuffer response = new StringBuffer();

      while ((inputLine = br.readLine()) != null) {
        response.append(inputLine);
      }
      br.close();
      //      log.info(response.toString()); //{"resultcode":"00","message":"success","response":{"id":"eXA1mCGXExwuGQZo9uYmxlKnXI9LLqV5E_2lSaoakeE","nickname":"bit","profile_image":"https:\/\/ssl.pstatic.net\/static\/pwe\/address\/img_profile.png","gender":"F","email":"bit@naver.com","mobile":"010-0000-0000","mobile_e164":"+821000000000","birthday":"01-19"}}

      String responseBody = response.toString();
      JSONObject jsonObject = new JSONObject(responseBody);
      JSONObject responseJson = jsonObject.getJSONObject("response");

      String nickname = responseJson.getString("nickname");
      String email = responseJson.getString("email");
      String password = UUID.randomUUID().toString();
      String link = email.contains("@naver.com") ? "naver" : "other";

      Member oldMember = memberService.getByEmail(email);
      //      log.info("oldMember >>> " + oldMember);
      if (oldMember == null) {
        Member member = new Member();
        member.setNickname(nickname);
        member.setEmail(email);
        member.setPassword(password);
        member.setLink(link);

        memberService.addOfExternal(member);
      }

      Member user = memberService.getByEmail(email);

      if (user != null && !user.getLink().equals("naver")) {
        //        log.info("artify 회원이 네이버 계정으로 접속 시도함!");

        return new RestResult()
            .setErrorCode(ErrorCode.rest.DUPLICATE_DATA)
            .setStatus(RestStatus.FAILURE);
      }

      session.setAttribute("loginUser", user);
      //      log.info("세선에 user 정보 입력 >>> " + user);

      return new RestResult()
          .setData(user)
          .setStatus(RestStatus.SUCCESS);

    } catch (Exception e) {
      log.error("네이버 로그인 중 에러 발생! : " + e);

      return new RestResult()
          .setStatus(RestStatus.FAILURE);
    }
  }

  @PutMapping("findpw")
  public Object findpw(String email) {

    Member member = memberService.getByEmail(email);

    if (member != null) {

      String authCode = UUID.randomUUID().toString().substring(0, 16);
      member.setAuthCode(authCode);
      memberService.updateAndSendAuthCodeByEmail(member);

      return new RestResult()
          .setData(member)
          .setStatus(RestStatus.SUCCESS);

    } else {
      return new RestResult()
          .setErrorCode(ErrorCode.rest.NO_DATA)
          .setStatus(RestStatus.FAILURE);
    }
  }

  @GetMapping("authcode")
  public Object authcode(String email, String authCode) {

    Member member = memberService.getByEmail(email);

    if (member != null) {

      if (authCode.equals(member.getAuthCode())) {
        return new RestResult()
            .setData(member)
            .setStatus(RestStatus.SUCCESS);

      } else {
        return new RestResult()
            .setErrorCode(ErrorCode.rest.MISS_MATCH)
            .setStatus(RestStatus.FAILURE);
      }

    } else {
      return new RestResult()
          .setErrorCode(ErrorCode.rest.NO_DATA)
          .setStatus(RestStatus.FAILURE);
    }
  }

}









