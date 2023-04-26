package bitcamp.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.app.service.FollowService;
import bitcamp.app.service.MemberService;
import bitcamp.app.vo.Follow;
import bitcamp.app.vo.Member;
import bitcamp.util.ErrorCode;
import bitcamp.util.RestResult;
import bitcamp.util.RestStatus;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/follow")
public class FollowController {

  @Autowired private FollowService followService;
  @Autowired private MemberService memberService;

  @GetMapping("check/{no}")
  public Object checkState(@PathVariable int no, HttpSession session) {
    Member loginUser = (Member) session.getAttribute("loginUser");

    if (loginUser == null) {
      return new RestResult()
          .setStatus(RestStatus.FAILURE)
          .setErrorCode(ErrorCode.rest.UNAUTHORIZED)
          .setData("로그인 요망");
    }

    if (loginUser.getNo() == no) {
      return new RestResult()
          .setStatus(RestStatus.SUCCESS)
          .setData("own");
    }

    Follow follow = new Follow();
    follow.setFollowingNo(loginUser.getNo());
    follow.setFollowerNo(no);
    if(!followService.checkState(follow)) {
      return new RestResult()
          .setStatus(RestStatus.SUCCESS)
          .setData("unfollow");
    }

    return new RestResult()
        .setStatus(RestStatus.SUCCESS)
        .setData("follow");
  }

  @GetMapping("{no}")
  public Object list(@PathVariable int no,  HttpSession session) {

    return new RestResult()
        .setStatus(RestStatus.SUCCESS)
        .setData(memberService.getFollowings(no));
  }


  @PostMapping
  public Object insert(@RequestBody Follow follow, HttpSession session) {
    Member loginUser = (Member) session.getAttribute("loginUser");

    if (loginUser == null) {
      return new RestResult()
          .setStatus(RestStatus.FAILURE)
          .setErrorCode(ErrorCode.rest.UNAUTHORIZED)
          .setData("로그인 요망");
    }

    follow.setFollowingNo(loginUser.getNo());
    followService.follow(follow);

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

    Follow follow = new Follow();
    follow.setFollowingNo(loginUser.getNo());
    follow.setFollowerNo(no);
    followService.unFollow(follow);

    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }


}

