package bitcamp.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.app.service.AlarmSettingService;
import bitcamp.app.vo.AlarmSetting;
import bitcamp.app.vo.Member;
import bitcamp.util.ErrorCode;
import bitcamp.util.RestResult;
import bitcamp.util.RestStatus;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/alarmSetting")
public class AlarmSettingController {

  @Autowired private AlarmSettingService alarmSettingService;

  @GetMapping
  public Object view(HttpSession session) {
    Member loginUser = (Member) session.getAttribute("loginUser");

    if (loginUser == null) {
      return new RestResult()
          .setStatus(RestStatus.FAILURE)
          .setErrorCode(ErrorCode.rest.UNAUTHORIZED)
          .setData("로그인 요망");
    }

    return alarmSettingService.view(loginUser.getNo());
  }


  @PostMapping
  public Object insert(@RequestBody AlarmSetting as, HttpSession session) {
    Member loginUser = (Member) session.getAttribute("loginUser");

    if (loginUser == null) {
      return new RestResult()
          .setStatus(RestStatus.FAILURE)
          .setErrorCode(ErrorCode.rest.UNAUTHORIZED)
          .setData("로그인 요망");
    }
    as.setMemberNo(loginUser.getNo());

    alarmSettingService.add(as);
    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }

  @DeleteMapping("{no}")
  public Object delete(@PathVariable int no, HttpSession session) {
    Member loginUser = (Member) session.getAttribute("loginUser");

    if (loginUser == null) {
      return new RestResult()
          .setStatus(RestStatus.FAILURE)
          .setErrorCode(ErrorCode.rest.UNAUTHORIZED)
          .setData("로그인 요망");
    }

    AlarmSetting as = new AlarmSetting();
    as.setMemberNo(loginUser.getNo());
    as.setTypeNo(no);
    alarmSettingService.delete(as);
    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }

}

