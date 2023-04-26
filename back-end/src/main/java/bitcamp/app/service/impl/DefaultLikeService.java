package bitcamp.app.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import bitcamp.app.dao.LikeBoardDao;
import bitcamp.app.dao.LikeReplyDao;
import bitcamp.app.dao.LogDao;
import bitcamp.app.service.LikeService;
import bitcamp.app.vo.Like;
import bitcamp.app.vo.Log;

@Service
public class DefaultLikeService implements LikeService{

  @Autowired private LikeReplyDao likeReplyDao;
  @Autowired private LikeBoardDao likeBoardDao;
  @Autowired private LogDao logDao;

  @Override
  public void like(Like like, String type) {
    Log log = new Log();
    log.setMemberNo(like.getLikerNo());
    log.setContentNo(like.getContentNo());
    switch(type) {
      case "reply":
        likeReplyDao.insert(like);
        log.setTypeNo(24);
        logDao.insert(log);
        break;
      case "board":
        likeBoardDao.insert(like);
        log.setTypeNo(14);
        logDao.insert(log);
        break;
      default:
    }
  }

  @Override
  public void disLike(Like like, String type) {
    switch(type) {
      case "reply":
        likeReplyDao.delete(like);
        break;
      case "board":
        likeBoardDao.delete(like);
        break;
      default:
    }
  }

  @Override
  public boolean checkState(Like like, String type) {
    switch(type) {
      case "reply":
        if (likeReplyDao.checkState(like) == 1) { return true; }
        break;
      case "board":
        if (likeBoardDao.checkState(like) == 1) { return true; }
        break;
      default:
        return false;
    }
    return false;
  }

  @Override
  public int countLiker(int contentNo, String type) {
    switch(type) {
      case "reply":
        return likeReplyDao.countLiker(contentNo);

      case "board":
        return likeBoardDao.countLiker(contentNo);

      default:
        return 0;
    }
  }

  @Override
  public int countLikerAllContnet(int memberNo) {
    return likeReplyDao.countLikerAll(memberNo)+likeBoardDao.countLikerAll(memberNo);
  }
}
