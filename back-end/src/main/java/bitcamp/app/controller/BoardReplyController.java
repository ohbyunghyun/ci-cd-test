package bitcamp.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.app.service.BoardReplyService;
import bitcamp.app.vo.BoardReply;

@RestController
public class BoardReplyController {

  @Autowired
  private BoardReplyService boardReplyService;

  @GetMapping("/boardreply/board/{date}")
  public ResponseEntity<BoardReply> getBoardCountByDate(@PathVariable("date") String date) {
    int count = boardReplyService.getBoardCountByDate(date);
    BoardReply boardReply = new BoardReply();
    boardReply.setType("게시글");
    boardReply.setCount(count);
    return new ResponseEntity<>(boardReply, HttpStatus.OK);
  }

  @GetMapping("/boardreply/reply/{date}")
  public ResponseEntity<BoardReply> getReplyCountByDate(@PathVariable("date") String date) {
    int count = boardReplyService.getReplyCountByDate(date);
    BoardReply boardReply = new BoardReply();
    boardReply.setType("댓글");
    boardReply.setCount(count);
    return new ResponseEntity<>(boardReply, HttpStatus.OK);
  }
}
