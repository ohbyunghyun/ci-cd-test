package bitcamp.app.controller;

import java.io.IOException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.app.service.PointService;
import bitcamp.app.service.ReplyService;
import bitcamp.app.vo.Member;
import bitcamp.app.vo.Reply;
import bitcamp.util.ErrorCode;
import bitcamp.util.RestResult;
import bitcamp.util.RestStatus;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/reply")
public class ReplyController {
  @Autowired private ReplyService replyService;
  @Autowired private PointService pointService;

  @PostMapping
  public Object insert(
      Reply reply,
      HttpSession session) throws IOException {

    Member loginUser = (Member) session.getAttribute("loginUser");
    reply.setWriter(loginUser);

    replyService.insert(reply);
    pointService.commentInsert(loginUser.getNo());

    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }

  @GetMapping("{no}")
  public List<Reply> view(@PathVariable int no) {

    return replyService.get(no);
  }

  @GetMapping("/like/{no}")
  public int countCommentLike(@PathVariable int no) {

    return replyService.countCommentLike(no);
  }

  @DeleteMapping("/delete/{no}")
  public Object commentDelete(@PathVariable int no) {

    replyService.commentDelete(no);

    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }

  @GetMapping("/islike/{no}")
  public Object checkLikeState(@PathVariable int no, HttpSession session) {

    Member loginUser = (Member) session.getAttribute("loginUser");

    if (loginUser == null) {
      System.out.println("로그인 요망");
      return new RestResult()
          .setStatus(RestStatus.FAILURE)
          .setErrorCode(ErrorCode.rest.UNAUTHORIZED)
          .setData("로그인 요망");
    }

    Reply reply = new Reply();
    reply.setMemberNo(loginUser.getNo());
    reply.setReplyNo(no);

    if(!replyService.checkLikeState(reply)) {
      return new RestResult()
          .setStatus(RestStatus.SUCCESS)
          .setData("unlike");
    }

    return new RestResult()
        .setStatus(RestStatus.SUCCESS)
        .setData("like");
  }

  @PostMapping("/like")
  public Object like(Reply reply, HttpSession session) {
    Member loginUser = (Member) session.getAttribute("loginUser");

    reply.setMemberNo(loginUser.getNo());

    replyService.like(reply);
    pointService.likeInsert(loginUser.getNo());

    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }

  @DeleteMapping("/like/{no}")
  public Object unlike(@PathVariable int no, HttpSession session) {
    Member loginUser = (Member) session.getAttribute("loginUser");

    Reply reply = new Reply();
    reply.setMemberNo(loginUser.getNo());
    reply.setReplyNo(no);

    replyService.unlike(reply);
    pointService.unlikeInsert(loginUser.getNo());

    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }


}


