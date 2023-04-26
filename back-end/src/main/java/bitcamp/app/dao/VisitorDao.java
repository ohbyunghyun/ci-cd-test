package bitcamp.app.dao;

import java.time.LocalDate;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import bitcamp.app.vo.Visitor;

@Mapper
public interface VisitorDao {
  void insert(Visitor visitor);

  // 차트 데이터를 가져오는 메서드 추가
  List<Visitor> findVisitor(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);

  // findByDateRange 메서드 추가
  List<Visitor> findByDateRange(@Param("start_date") String startDate, @Param("end_date") String endDate);

}
