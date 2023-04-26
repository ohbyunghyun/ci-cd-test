package bitcamp.app.vo;

import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;
import lombok.Data;

@Data
public class Log {
  private int logNo;
  private int typeNo;
  private int memberNo;
  private int contentNo;
  private String content;
  private boolean readFlag; //애매한데

  @JsonFormat(
      shape = Shape.STRING,
      pattern = "yyyy-MM-dd HH:mm:ss")
  private LocalDateTime recordDate;
}
