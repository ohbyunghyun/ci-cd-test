package bitcamp.app.service;

import java.util.List;
import bitcamp.app.vo.AlarmLog;
import bitcamp.app.vo.Log;

public interface AlarmService {

  List<AlarmLog> list(int no);
  List<Log> getLogs(int memberNo);
  List<Log> getPublicLogs(int memberNo);
  void read(int no);
  void readAll(int memberNo);
  void readAllCancel(int memberNo);
}
