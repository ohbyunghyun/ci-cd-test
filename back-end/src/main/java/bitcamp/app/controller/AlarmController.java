package bitcamp.app.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.app.service.AlarmService;
import bitcamp.app.service.MemberService;
import bitcamp.app.vo.Log;
import bitcamp.app.vo.Member;
import bitcamp.util.ErrorCode;
import bitcamp.util.RestResult;
import bitcamp.util.RestStatus;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/alarm")
public class AlarmController {

  Logger log = LogManager.getLogger(getClass());

  {
    log.trace("AlarmController 생성됨!");
  }

  @Autowired private AlarmService alarmService;
  @Autowired private MemberService memberService;

  @GetMapping
  public Object alarms(HttpSession session) {
    Member loginUser = (Member) session.getAttribute("loginUser");

    if (loginUser == null) {
      return new RestResult()
          .setStatus(RestStatus.FAILURE)
          .setErrorCode(ErrorCode.rest.UNAUTHORIZED)
          .setData("로그인 요망");
    }

    Map<String, Object> data = new HashMap<>();
    List<Object> logData = new ArrayList<>();
    data.put("receiver", loginUser);
    for (Log l : alarmService.getLogs(loginUser.getNo())) {
      Map<String, Object> part = new HashMap<>();
      part.put("giver", memberService.get(l.getMemberNo()));
      part.put("log", l);
      logData.add(part);
    }
    data.put("logData", logData);

    return data;
  }


  @GetMapping("public") // modal용 요청
  public Object publicAlarms(HttpSession session) {
    Member loginUser = (Member) session.getAttribute("loginUser");

    if (loginUser == null) {
      return new RestResult()
          .setStatus(RestStatus.FAILURE)
          .setErrorCode(ErrorCode.rest.UNAUTHORIZED)
          .setData("로그인 요망");
    }

    Map<String, Object> data = new HashMap<>();
    List<Object> logData = new ArrayList<>();
    data.put("receiver", loginUser);
    for (Log l : alarmService.getPublicLogs(loginUser.getNo())) {
      Map<String, Object> part = new HashMap<>();
      part.put("giver", memberService.get(l.getMemberNo()));
      part.put("log", l);
      logData.add(part);
    }
    data.put("logData", logData);

    return data;
  }



  @PutMapping("{no}")
  public Object read(@PathVariable int no, HttpSession session) {
    Member loginUser = (Member) session.getAttribute("loginUser");

    if (loginUser == null) {
      return new RestResult()
          .setStatus(RestStatus.FAILURE)
          .setErrorCode(ErrorCode.rest.UNAUTHORIZED)
          .setData("로그인 요망");
    }
    alarmService.read(no);
    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }

  @PutMapping("readAll")
  public Object readAll(HttpSession session) {
    Member loginUser = (Member) session.getAttribute("loginUser");

    if (loginUser == null) {
      return new RestResult()
          .setStatus(RestStatus.FAILURE)
          .setErrorCode(ErrorCode.rest.UNAUTHORIZED)
          .setData("로그인 요망");
    }
    alarmService.readAll(loginUser.getNo());
    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }

  @PutMapping("readAllCancel")
  public Object readAllCancel(HttpSession session) {
    Member loginUser = (Member) session.getAttribute("loginUser");

    if (loginUser == null) {
      return new RestResult()
          .setStatus(RestStatus.FAILURE)
          .setErrorCode(ErrorCode.rest.UNAUTHORIZED)
          .setData("로그인 요망");
    }
    alarmService.readAllCancel(loginUser.getNo());
    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }
}
