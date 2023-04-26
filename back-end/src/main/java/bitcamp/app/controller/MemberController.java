package bitcamp.app.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import bitcamp.app.service.BoardService;
import bitcamp.app.service.FollowService;
import bitcamp.app.service.LikeService;
import bitcamp.app.service.MemberService;
import bitcamp.app.service.ObjectStorageService;
import bitcamp.app.service.PublicSettingService;
import bitcamp.app.vo.Board;
import bitcamp.app.vo.Member;
import bitcamp.app.vo.PublicSetting;
import bitcamp.util.ErrorCode;
import bitcamp.util.RestResult;
import bitcamp.util.RestStatus;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/member")
public class MemberController {
  @Autowired private MemberService memberService;
  @Autowired private FollowService followService;
  @Autowired private LikeService likeService;
  @Autowired private BoardService boardService;
  @Autowired private PublicSettingService publicSettingService;

  @Autowired private ObjectStorageService objectStorageService;
  private String bucketName = "artify-bucket";

  @PostMapping
  public void insert(@RequestBody Member member) {

  }

  @GetMapping("{no}")
  public Object view(@PathVariable int no, HttpSession session) {

    boolean boardHideSetting = false;
    for (PublicSetting ps : publicSettingService.view(no)) {
      if (ps.getTypeNo() == 5 && ps.getRangeState() == 2) {
        boardHideSetting = true;
      }
    }
    Map<String, Object> data = new HashMap<>();
    data.put("member", memberService.get(no));

    if (!boardHideSetting ||
        (session.getAttribute("loginUser") != null &&
        ((Member)session.getAttribute("loginUser")).getNo() == no)) {
      List<Board> list = boardService.getByMemberNo(no);
      for (Board b : list) {
        b.setLikeCnt(likeService.countLiker(b.getBoardNo(), "board"));
      }
      data.put("boards", list);
    } else {
      data.put("boards", new ArrayList<Board>());
    }
    //Following List는 실시간 변경이 필요하니 followController로 이동
    //data.put("followingList", memberService.getFollowings(no));
    data.put("followerList", memberService.getFollowers(no)); //얘는 실시간 변경이 필요없을까
    data.put("followingCount", followService.getFollowingCount(no));
    data.put("followerCount", followService.getFollowerCount(no));
    data.put("likeCount", likeService.countLikerAllContnet(no));
    return new RestResult()
        .setStatus(RestStatus.SUCCESS)
        .setData(data);
  }

  @PutMapping
  public Object update(
      @RequestBody Member member,
      HttpSession session) {
    Member loginUser = (Member) session.getAttribute("loginUser");

    if (loginUser == null) {
      return new RestResult()
          .setStatus(RestStatus.FAILURE)
          .setErrorCode(ErrorCode.rest.UNAUTHORIZED)
          .setData("로그인 요망");
    }


    loginUser.setPassword(member.getPassword() != null && member.getPassword() != ""
        ?  member.getPassword() : loginUser.getPassword());
    loginUser.setGender(member.getGender() != loginUser.getGender() ?  member.getGender() : loginUser.getGender());
    loginUser.setBirthDate(member.getBirthDate() != null ?  member.getBirthDate() : loginUser.getBirthDate());
    loginUser.setTel(member.getTel() != null ?  member.getTel() : loginUser.getTel());
    loginUser.setBasicAddress(member.getBasicAddress() != null ?  member.getBasicAddress() : loginUser.getBasicAddress());
    loginUser.setInformation(member.getInformation() != null ?  member.getInformation() : loginUser.getInformation());

    memberService.update(loginUser);
    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }

  @PutMapping("nickname")
  public Object updateNickname(
      @RequestParam String nickname,
      HttpSession session) {
    Member loginUser = (Member) session.getAttribute("loginUser");

    if (loginUser == null) {
      return new RestResult()
          .setStatus(RestStatus.FAILURE)
          .setErrorCode(ErrorCode.rest.UNAUTHORIZED)
          .setData("로그인 요망");
    }
    loginUser.setNickname(nickname);
    memberService.updateNickname(loginUser);
    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }



  @PutMapping("upload/profileImg")
  public Object updateProfileImg(
      MultipartFile profilePhoto, //이미지 하나만 바꾸는거라 다른 정보는 받지 않음
      HttpSession session
      ) throws Exception {

    Member loginUser = (Member) session.getAttribute("loginUser");

    if (loginUser == null) {
      return new RestResult()
          .setStatus(RestStatus.FAILURE)
          .setErrorCode(ErrorCode.rest.UNAUTHORIZED)
          .setData("로그인 요망");
    }
    // 받은 파일 스토리지에 업로드
    String filename = objectStorageService.uploadFile(bucketName, "profile/", profilePhoto);
    if (filename == null) {
      System.out.println("파일명 null");
    }
    System.out.println(filename);
    //기존에 올라가있던 프로필 사진 삭제
    //objectStorageService.deleteFile(loginUser.getProfilePhoto());

    //https://artify-bucket.kr.object.ncloudstorage.com/profile9d1e9f43-e57d-4a32-b884-2679a3d23310
    loginUser.setProfilePhoto(filename);


    memberService.updateProfilePhoto(loginUser);
    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }

  @GetMapping("check/nickname/{nickname}")
  public Object checkNinckname(@PathVariable String nickname) {
    Member m = memberService.getByNickname(nickname);
    if (m == null) {
      return new RestResult()
          .setStatus(RestStatus.SUCCESS)
          .setData("사용가능");
    }
    return new RestResult()
        .setStatus(RestStatus.FAILURE)
        .setData("사용불가");
  }

  @PutMapping("password")
  public Object password(String email, String password) {
    Member member = new Member();
    member.setEmail(email);
    member.setPassword(password);

    memberService.updatePassword(member);

    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }

}

