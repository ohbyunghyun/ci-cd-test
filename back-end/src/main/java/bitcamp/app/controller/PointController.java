package bitcamp.app.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.app.service.PointService;
import bitcamp.app.vo.Member;
import bitcamp.app.vo.Point;
import bitcamp.util.RestResult;
import bitcamp.util.RestStatus;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/point")
public class PointController {
  @Autowired private PointService pointService;

  @PostMapping
  public Object userInsert(Point point, HttpSession session) {
    Member m = (Member) session.getAttribute("loginUser");
    point.setSendmemberNo(m.getNo());

    pointService.userInsert(point);

    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }

  @GetMapping("member")
  public int findPointMine(HttpSession session) {

    Member m = (Member) session.getAttribute("loginUser");

    return pointService.findPoint(m.getNo());
  }

  @GetMapping("member/{no}")
  public int findPoint(@PathVariable int no) {

    return pointService.findPoint(no);
  }

  @GetMapping("log")
  public List<Point> findPointLog(HttpSession session) {
    Member m = (Member) session.getAttribute("loginUser");

    return pointService.findPointLog(m.getNo());
  }

  @GetMapping("board/{no}")
  public int findPointByBoard(@PathVariable int no) {

    return pointService.findPointByBoard(no);
  }
}


