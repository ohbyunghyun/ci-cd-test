package bitcamp.app.vo;

import java.time.LocalDate;
import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;
import lombok.Data;

@Data
public class Visitor {
  private int visitorNo;

  @JsonFormat(
      shape = Shape.STRING,
      pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+9")
  private LocalDateTime visitorDt;

  // 차트에 사용할 x, y 축 정보 추가
  private LocalDate date; // x축: 날짜
  private int count; // y축: 방문자 수
}