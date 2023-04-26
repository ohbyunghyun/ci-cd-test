package bitcamp.app.service.impl;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import bitcamp.app.dao.BoardDao;
import bitcamp.app.dao.GeneratedImgDao;
import bitcamp.app.dao.LogDao;
import bitcamp.app.service.BoardService;
import bitcamp.app.vo.Board;
import bitcamp.app.vo.GeneratedImg;
import bitcamp.app.vo.Log;

@Service
public class DefaultBoardService implements BoardService{

  @Autowired private BoardDao boardDao;
  @Autowired private GeneratedImgDao generatedImgDao;
  @Autowired private LogDao logDao;

  @Transactional
  @Override
  public void add(Board board) {
    boardDao.insert(board);

    GeneratedImg generatedImg = new GeneratedImg();
    generatedImg.setFilename(board.getGeneratedImg().getFilename());
    generatedImg.setBoardNo(board.getBoardNo());
    generatedImgDao.insert(generatedImg);

    Log log = new Log();
    log.setMemberNo(board.getWriter().getNo());
    log.setContentNo(board.getBoardNo());
    log.setTypeNo(11);
    logDao.insert(log);
  }

  @Override
  public List<Board> list(Map<Object, Object> page) {
    return boardDao.findAll(page);
  }

  @Override
  public Board get(int no) {
    return boardDao.findByNo(no);
  }

  @Override
  public List<Board> getByMemberNo(int memberNo) {
    return boardDao.findByMemberNo(memberNo);
  }

  @Override
  public void update(Board board) {

  }

  @Transactional
  @Override
  public void deleteBoard(int boardNo, List<Integer> replyNos) {
    for (Integer replyNo : replyNos) {
      boardDao.deleteReplyLikeByReplyNo(replyNo);
      boardDao.deleteReplyReportByReplyNo(replyNo);
      boardDao.deleteAlarmLogByReplyNo(replyNo);
    }
    boardDao.deleteGeneratedImgByBoardNo(boardNo);
    boardDao.deleteTagByBoardNo(boardNo);
    boardDao.deleteBoardLikeByBoardNo(boardNo);
    boardDao.deleteReplyByBoardNo(boardNo);
    boardDao.deleteReportByBoardNo(boardNo);
    boardDao.deletePointLogByBoardNo(boardNo);
    boardDao.deleteAlarmLogByBoardNo(boardNo);
    boardDao.deleteBoard(boardNo);
  }

  @Override
  public List<Board> listHot() {
    return boardDao.findAllHot();
  }

  @Override
  public List<Board> listRecent() {
    return boardDao.findAllRecent();
  }

  @Override
  public List<Board> listFollow(int no) {
    return boardDao.findFollow(no);
  }

  @Override
  public void addTag(Map tag) {
    boardDao.insertTag(tag);

  }

  @Override
  public List<Board> listTag(int no) {
    return boardDao.findTag(no);
  }


}
