package bitcamp.app.service;


import java.util.List;
import bitcamp.app.vo.Visitor;

public interface VisitorService {
  void add(Visitor visitor);


  // findVisitor 메서드 추가
  List<Visitor> findVisitor(String startDate, String endDate);
}

