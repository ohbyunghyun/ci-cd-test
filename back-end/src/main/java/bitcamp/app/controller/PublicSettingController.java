package bitcamp.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.app.service.PublicSettingService;
import bitcamp.app.vo.Member;
import bitcamp.app.vo.PublicSetting;
import bitcamp.util.ErrorCode;
import bitcamp.util.RestResult;
import bitcamp.util.RestStatus;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/publicSetting")
public class PublicSettingController {

  @Autowired private PublicSettingService publicSettingService;

  @GetMapping
  public Object view(HttpSession session) {
    Member loginUser = (Member) session.getAttribute("loginUser");

    if (loginUser == null) {
      return new RestResult()
          .setStatus(RestStatus.FAILURE)
          .setErrorCode(ErrorCode.rest.UNAUTHORIZED)
          .setData("로그인 요망");
    }

    return publicSettingService.view(loginUser.getNo());
  }


  @PostMapping
  public Object insert(@RequestBody PublicSetting ps, HttpSession session) {
    Member loginUser = (Member) session.getAttribute("loginUser");
    System.out.println(ps);
    if (loginUser == null) {
      return new RestResult()
          .setStatus(RestStatus.FAILURE)
          .setErrorCode(ErrorCode.rest.UNAUTHORIZED)
          .setData("로그인 요망");
    }
    ps.setMemberNo(loginUser.getNo());

    publicSettingService.add(ps);
    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }

  @PutMapping
  public Object update(@RequestBody PublicSetting ps, HttpSession session) {
    Member loginUser = (Member) session.getAttribute("loginUser");
    if (loginUser == null) {
      return new RestResult()
          .setStatus(RestStatus.FAILURE)
          .setErrorCode(ErrorCode.rest.UNAUTHORIZED)
          .setData("로그인 요망");
    }
    ps.setMemberNo(loginUser.getNo());
    publicSettingService.update(ps);
    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }


  @DeleteMapping("{no}")
  public Object delete(@PathVariable int no, @RequestParam String type, HttpSession session) {
    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }


}

