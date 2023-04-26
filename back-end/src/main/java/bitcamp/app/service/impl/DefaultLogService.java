package bitcamp.app.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import bitcamp.app.dao.LogDao;
import bitcamp.app.service.LogService;
import bitcamp.app.vo.Log;

@Service
public class DefaultLogService implements LogService{

  @Autowired private LogDao logDao;

  @Override
  public void add(Log log) {
    logDao.insert(log);
  }
}
