package bitcamp.app.service;

import java.util.List;
import java.util.Map;
import bitcamp.app.vo.Board;

public interface BoardService {
  void add(Board board);
  void addTag(Map tag);
  List<Board> list(Map<Object, Object> page);
  List<Board> listHot();
  List<Board> listRecent();
  List<Board> listFollow(int no);
  List<Board> listTag(int no);
  Board get(int no);
  List<Board> getByMemberNo(int memeberNo);
  void update(Board board);
  void deleteBoard(int boardNo, List<Integer> replyNos);
}
