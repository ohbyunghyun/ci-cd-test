package bitcamp.app;

import java.util.ArrayList;
import java.util.List;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public class SseManager {
  private List<SseEmitter> emitters = new ArrayList<>();

  public synchronized void addEmitter(SseEmitter emitter) {
    emitters.add(emitter);
  }

  public synchronized void removeEmitter(SseEmitter emitter) {
    emitters.remove(emitter);
  }

  public synchronized void sendToAll(String message) {
    List<SseEmitter> deadEmitters = new ArrayList<>();
    emitters.forEach(emitter -> {
      try {
        emitter.send(message);
      } catch (Exception e) {
        deadEmitters.add(emitter);
      }
    });
    emitters.removeAll(deadEmitters);
  }
}

