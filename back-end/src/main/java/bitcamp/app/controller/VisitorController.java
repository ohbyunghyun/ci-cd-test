package bitcamp.app.controller;


import java.time.LocalDateTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.app.service.VisitorService;
import bitcamp.app.vo.Visitor;


@RestController
@RequestMapping("/visitors")
public class VisitorController {

  @Autowired
  private VisitorService visitorService;

  @PostMapping
  public Visitor add() {
    Visitor visitor = new Visitor();
    visitor.setVisitorDt(LocalDateTime.now());
    visitorService.add(visitor);
    return visitor;
  }


  // findVisitor 메서드 추가
  @GetMapping
  public List<Visitor> findVisitor(
      @RequestParam("start_date") String startDate,
      @RequestParam("end_date") String endDate) {
    return visitorService.findVisitor(startDate, endDate);
  }
}
