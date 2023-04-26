package bitcamp.app.service;

public interface BoardReplyService {
  int getBoardCountByDate(String date);
  int getReplyCountByDate(String date);
}
