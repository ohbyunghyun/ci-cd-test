package bitcamp.app.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.app.service.ReportService;
import bitcamp.app.vo.Member;
import bitcamp.app.vo.Report;
import bitcamp.util.RestResult;
import bitcamp.util.RestStatus;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/report")
public class ReportController {
  @Autowired private ReportService reportService;

  @PostMapping
  public Object replyReport(
      Report report,
      HttpSession session) {

    Member loginUser = (Member) session.getAttribute("loginUser");
    report.setMemberNo(loginUser.getNo());

    System.out.println(report);

    if (report.getReplyNo() != 0) {
      reportService.replyReport(report);
    } else if (report.getBoardNo() != 0) {
      reportService.boardReport(report);
    }

    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }

  @GetMapping
  public List<Report> findReportType() {

    return reportService.findReportType();
  }


}


