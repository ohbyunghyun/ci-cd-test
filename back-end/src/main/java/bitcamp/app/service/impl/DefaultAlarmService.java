package bitcamp.app.service.impl;

import java.util.List;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import bitcamp.app.dao.AlarmDao;
import bitcamp.app.dao.LogDao;
import bitcamp.app.service.AlarmService;
import bitcamp.app.vo.AlarmLog;
import bitcamp.app.vo.Log;

@Service
public class DefaultAlarmService implements AlarmService {

  Logger log = LogManager.getLogger(getClass());

  @Autowired private AlarmDao alarmDao;
  @Autowired private LogDao logDao;

  @Override
  public List<AlarmLog> list(int no) {
    return alarmDao.findAll(no);
  }

  @Override
  public List<Log> getLogs(int memberNo) {
    return logDao.alarmList(memberNo);
  }

  @Override
  public List<Log> getPublicLogs(int memberNo) {
    return logDao.publicAlarmList(memberNo);
  }

  @Override
  public void read(int no) {
    logDao.read(no);
  }

  @Override
  public void readAll(int memberNo) {
    logDao.readAll(memberNo);
  }

  @Override
  public void readAllCancel(int memberNo) {
    logDao.readAllCancel(memberNo);
  }



}
