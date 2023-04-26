package bitcamp.app.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import bitcamp.app.dao.BoardReplyDAO;
import bitcamp.app.service.BoardReplyService;

@Service
public class DefaultBoardReplyService implements BoardReplyService {

  @Autowired
  private BoardReplyDAO boardReplyDAO;

  @Override
  public int getBoardCountByDate(String date) {
    return boardReplyDAO.getBoardCountByDate(date);
  }

  @Override
  public int getReplyCountByDate(String date) {
    return boardReplyDAO.getReplyCountByDate(date);
  }
}
