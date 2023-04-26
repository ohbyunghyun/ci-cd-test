package bitcamp.app.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import bitcamp.app.vo.Log;

@Mapper
public interface LogDao {
  void insert(Log log);
  List<Log> alarmList(int memberNo);
  List<Log> publicAlarmList(int memberNo);
  void read(int no);
  void readAll(int memberNo);
  void readAllCancel(int memberNo);
}
