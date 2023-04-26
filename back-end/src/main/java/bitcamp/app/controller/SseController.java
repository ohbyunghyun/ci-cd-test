package bitcamp.app.controller;

import java.util.Map;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import bitcamp.app.SseManager;

@RestController
public class SseController {

  Logger log = LogManager.getLogger(getClass());

  {
    log.trace("SseController 생성됨!");
  }

  private SseManager sseManager = new SseManager();
  private final ObjectMapper objectMapper = new ObjectMapper();

  @GetMapping("/sse")
  public SseEmitter handleSse() {

    SseEmitter emitter = new SseEmitter(5 * 60 * 1000L);  // 클라이언트와 연결 유지 시간
    // log.info("등록된 emitter 주소 >>> " + emitter.toString());
    sseManager.addEmitter(emitter);

    emitter.onCompletion(() -> sseManager.removeEmitter(emitter));
    emitter.onTimeout(() -> sseManager.removeEmitter(emitter));

    return emitter;
  }

  public void sendMessageToAll(Map<String, String> message) {
    try {
      String jsonMessage = objectMapper.writeValueAsString(message);
      // log.info("jsonMessage >>> " + jsonMessage);
      sseManager.sendToAll(jsonMessage);
    } catch (JsonProcessingException e) {
      // JSON 변환 중 에러 처리
      e.printStackTrace();
    }
  }
}
