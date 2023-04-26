package bitcamp.app.service.impl;


import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import bitcamp.app.dao.VisitorDao;
import bitcamp.app.service.VisitorService;
import bitcamp.app.vo.Visitor;

@Service
public class DefaultVisitorService implements VisitorService {

  @Autowired
  private VisitorDao visitorDao;

  @Override
  public void add(Visitor visitor) {
    visitorDao.insert(visitor);
  }

  // findVisitor 메서드 구현
  @Override
  public List<Visitor> findVisitor(String startDate, String endDate) {
    return visitorDao.findByDateRange(startDate, endDate);
  }
}
