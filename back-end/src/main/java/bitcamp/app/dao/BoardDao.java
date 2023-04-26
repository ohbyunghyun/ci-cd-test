package bitcamp.app.dao;

import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Mapper;
import bitcamp.app.vo.Board;

@Mapper
public interface BoardDao {
  void insert(Board b);
  void insertTag(Map tag);
  List<Board> findAll(Map<Object, Object> page);
  List<Board> findAllHot();
  List<Board> findAllRecent();
  List<Board> findFollow(int no);
  Board findByNo(int no);
  List<Board> findTag(int no);
  List<Board> findByMemberNo(int no);
  int update(Board b);
  int deleteBoard(int no);
  void deleteGeneratedImgByBoardNo(int no);
  void deleteTagByBoardNo(int no);
  void deleteBoardLikeByBoardNo(int no);
  void deleteReplyLikeByReplyNo(int no);
  void deleteReplyReportByReplyNo(int no);
  void deleteReplyByBoardNo(int no);
  void deleteReportByBoardNo(int no);
  void deletePointLogByBoardNo(int no);
  void deleteAlarmLogByBoardNo(int no);
  void deleteAlarmLogByReplyNo(int no);
}
