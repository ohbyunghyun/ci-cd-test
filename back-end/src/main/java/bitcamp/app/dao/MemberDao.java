package bitcamp.app.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import bitcamp.app.vo.Member;

@Mapper
public interface MemberDao {
  void insert(Member m);
  void insertExternal(Member m);
  List<Member> findAll();
  Member findByNo(int no);
  Member findByEmailAndPassword(Map<String,Object> map);
  void lastLoginUpdate(int no);
  Member findByEmail(String email);
  Member findByNickname(String nickname);
  Member findByToken(String token);
  int update(Member m);
  int delete(int no);
  void updateProfile(Member m);
  void updateNickname(Member m);
  void updateToken(Member m);
  void updateStateByToken(String token);
  void updateIsGenerating(Member m);
  void updateAuthCode(Member m);
  void updatePassword(Member member);
  void updateAccountState(@Param("no") int memberNo, @Param("state") int state);
}
