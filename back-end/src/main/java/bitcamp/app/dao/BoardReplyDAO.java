package bitcamp.app.dao;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BoardReplyDAO {
  int getBoardCountByDate(String date);
  int getReplyCountByDate(String date);

}
