package bitcamp.app.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import bitcamp.app.dao.LogDao;
import bitcamp.app.dao.ReplyDao;
import bitcamp.app.service.ReplyService;
import bitcamp.app.vo.Log;
import bitcamp.app.vo.Member;
import bitcamp.app.vo.Reply;

@Service
public class DefaultReplyService implements ReplyService{

  @Autowired private ReplyDao replyDao;
  @Autowired private LogDao logDao;

  @Override
  public List<Reply> list() {
    return replyDao.findAll();
  }

  @Override
  public List<Reply> get(int no) {
    return replyDao.findByNo(no);
  }

  @Override
  public void insert(Reply reply) {
    replyDao.insert(reply);

    Log log = new Log();
    log.setMemberNo(reply.getWriter().getNo());
    log.setContentNo(reply.getReplyNo());
    log.setTypeNo(21);
    log.setContent("");
    logDao.insert(log);
  }

  @Override
  public int countCommentLike(int no) {
    return replyDao.countCommentLike(no);
  }

  @Transactional
  @Override
  public void commentDelete(int no) {
    replyDao.unlikeAll(no);
    replyDao.commentDelete(no);
  }

  @Override
  public boolean checkLikeState(Reply reply) {
    if (replyDao.checkLikeState(reply) == 1) {
      return true;
    }
    return false;

  }

  @Override
  public void like(Reply reply) {
    replyDao.like(reply);
    System.out.println("like" + reply);
    Log log = new Log();
    log.setMemberNo(reply.getMemberNo());
    log.setContentNo(reply.getReplyNo());
    log.setTypeNo(24);
    log.setContent("");
    logDao.insert(log);
  }

  @Override
  public void unlike(Reply reply) {
    replyDao.unlike(reply);
  }
}
