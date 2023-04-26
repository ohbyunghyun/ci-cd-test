package bitcamp.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.app.service.LikeService;
import bitcamp.app.service.PointService;
import bitcamp.app.vo.Like;
import bitcamp.app.vo.Member;
import bitcamp.util.ErrorCode;
import bitcamp.util.RestResult;
import bitcamp.util.RestStatus;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/like")
public class LikeController {

  @Autowired private LikeService likeService;
  @Autowired private PointService pointService;

  @GetMapping("{no}")
  public Object checkState(@PathVariable int no, @RequestParam String type, HttpSession session) {
    Member loginUser = (Member) session.getAttribute("loginUser");

    if (loginUser == null) {
      return new RestResult()
          .setStatus(RestStatus.FAILURE)
          .setErrorCode(ErrorCode.rest.UNAUTHORIZED)
          .setData("로그인 요망");
    }

    //    if (loginUser.getNo() == no) {
    //      return new RestResult()
    //          .setStatus(RestStatus.SUCCESS)
    //          .setData("own");
    //    }

    Like like = new Like();
    like.setLikerNo(loginUser.getNo());
    like.setContentNo(no);
    if(!likeService.checkState(like, type)) {
      return new RestResult()
          .setStatus(RestStatus.SUCCESS)
          .setData("disLike");
    }
    return new RestResult()
        .setStatus(RestStatus.SUCCESS)
        .setData("like");
  }
  //
  //  @GetMapping
  //  public Object list(HttpSession session) {
  //    Member loginUser = (Member) session.getAttribute("loginUser");
  //
  //    if (loginUser == null) {
  //      return new RestResult()
  //          .setStatus(RestStatus.FAILURE)
  //          .setErrorCode(ErrorCode.rest.UNAUTHORIZED)
  //          .setData("로그인 요망");
  //    }
  //
  //    return new RestResult()
  //        .setStatus(RestStatus.SUCCESS)
  //        .setData(memberService.getFollowings(loginUser.getNo()));
  //  }


  @PostMapping
  public Object insert(@RequestBody Like like, @RequestParam String type, HttpSession session) {
    Member loginUser = (Member) session.getAttribute("loginUser");

    if (loginUser == null) {
      return new RestResult()
          .setStatus(RestStatus.FAILURE)
          .setErrorCode(ErrorCode.rest.UNAUTHORIZED)
          .setData("로그인 요망");
    }

    like.setLikerNo(loginUser.getNo());
    likeService.like(like, type);
    pointService.likeInsert(loginUser.getNo());

    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }

  @DeleteMapping("{no}")
  public Object delete(@PathVariable int no, @RequestParam String type, HttpSession session) {
    Member loginUser = (Member) session.getAttribute("loginUser");
    if (loginUser == null) {
      return new RestResult()
          .setStatus(RestStatus.FAILURE)
          .setErrorCode(ErrorCode.rest.UNAUTHORIZED)
          .setData("로그인 요망");
    }

    Like like = new Like();
    like.setLikerNo(loginUser.getNo());
    like.setContentNo(no);
    likeService.disLike(like, type);
    pointService.unlikeInsert(loginUser.getNo());

    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }


}

