package bitcamp.app.interceptor;
import java.io.PrintWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import bitcamp.app.service.MemberService;
import bitcamp.app.service.PointService;
import bitcamp.app.vo.Member;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
@Component
public class AdminInterceptor implements HandlerInterceptor {
  @Autowired
  private PointService pointService;
  @Autowired
  private HttpSession session;

  @Autowired
  private MemberService memberService;
  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
    Member member = (Member) session.getAttribute("loginUser");

    if (member != null && member.getAuthLevel() == 9) {
      pointService.loginInsert(member.getNo());
      return true;
    } else {
      response.setContentType("text/html;charset=UTF-8");
      PrintWriter out = response.getWriter();
      out.print("<script>alert('권한이 없습니다.');history.back();</script>");
      response.sendRedirect("http://localhost:3000");
      return false;
    }
  }
}