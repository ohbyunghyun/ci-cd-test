package bitcamp.app;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import bitcamp.app.interceptor.AdminInterceptor;

@EnableTransactionManagement
@SpringBootApplication
@ComponentScan(basePackages = {"bitcamp.app", "bitcamp.util"})
public class App implements WebMvcConfigurer{

  public static void main(String[] args) {
    SpringApplication.run(App.class, args);
  }

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**")
    .allowCredentials(true)  // SpringBoot + axios 사용 관련 AuthController 에서 HttpSession 동일 객체 사용을 위한 설정
    .allowedOrigins("http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:3001", "http://127.0.0.1:3001")
    .allowedMethods("*");
  }


  @Autowired
  private AdminInterceptor adminInterceptor;

  @Override
  public void addInterceptors(InterceptorRegistry registry) {
    registry.addInterceptor(adminInterceptor)
    .addPathPatterns("/admin/**"); // 인터셉터를 /admin/** 경로에 적용
  }

}
