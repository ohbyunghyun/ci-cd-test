

package bitcamp.app.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.app.service.FaqService;
import bitcamp.app.vo.Faq;

@RestController
@RequestMapping
public class FaqController {
  @Autowired private FaqService faqService;

  @GetMapping("/faqType")
  public List<Faq> findFaqType() {

    return faqService.findFaqType();
  }

  @GetMapping("/faqTitleContent")
  public List<Faq> findFaq(@RequestParam("faq_type_no") String faqTypeNo) {
    return faqService.findFaqByType(faqTypeNo);
  }

}

//  @GetMapping("/faqTitleContent")
//  //  @GetMapping
//  public List<Faq> findFaq() {
//
//    return faqService.findFaq();
//  }