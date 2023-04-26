import React, { useEffect, useState } from "react";
import styles from "./MemberList.module.css";
import Table from "react-bootstrap/Table";
import MemberView from "./MemberView";
import axios from "axios";
import BoardList from "./BoardList";
import CommentList from "./CommentList";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import NavBar from "./NavBar";

function MemberList(props) {
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedNo, setSelectedNo] = useState();
  const navigate = useNavigate();
  const [point, setPoint] = useState(null);

  useEffect(() => {
    if (props.currentUser && props.currentUser.authLevel !== 9) {
      // alert("권한이 없습니다.");
      Swal.fire({
        title: "권한이 없습니다.",
        confirmButtonText: "확인",
      });
      navigate("/");
    }
  }, [props.currentUser]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/admin")
      .then((response) => {
        console.log("data : ");
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  function handleColumnSelect(selectedNo) {
    if (!selectedNo) {
      return;
    }

    console.log("Selected number:", selectedNo);
    setSelectedNo(selectedNo);
    setModalShow(true);
  }

  return (
    <>
      {props.currentUser && props.currentUser.authLevel === 9 && (
        <div className={styles.MemberList}>
          <h1>관리 페이지</h1>
          <NavBar />
          <Table
            striped
            bordered
            hover
            variant={props.isLightMode === true ? "light" : "dark"}
          >
            <thead>
              <tr>
                <th>회원번호</th>
                <th>닉네임</th>
                <th>이메일</th>
                <th>가입일</th>
                <th>성별</th>
                <th>계정상태</th>
                <th>비밀번호 변경일시</th>
                <th>권한레벨</th>
              </tr>
            </thead>
            <tbody>
              {data.map((member) => (
                <tr
                  key={member.no}
                  onClick={() => handleColumnSelect(member.no)}
                >
                  <td className="td">{member.no}</td>
                  <td className="td">{member.nickname}</td>
                  <td className="td">{member.email}</td>
                  <td className="td">{member.createdDate}</td>
                  <td className="td">
                    {member.gender === 0
                      ? "미정"
                      : member.gender === 1
                      ? "남"
                      : member.gender === 2
                      ? "여"
                      : ""}
                  </td>
                  <td className="td">
                    {member.accountState === 0
                      ? "이메일 인증"
                      : member.accountState === 1
                      ? "이메일 미인증"
                      : member.accountState === 2
                      ? "휴면계정"
                      : member.accountState === 3
                      ? "탈퇴"
                      : member.accountState === 4
                      ? "정지"
                      : ""}
                  </td>
                  <td className="td">{member.passwordDate}</td>
                  <td className="td">
                    {member.authLevel === 0
                      ? "일반"
                      : member.authLevel === 9
                      ? "관리자"
                      : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
      <MemberView show={modalShow} setShow={setModalShow} no={selectedNo} />
    </>
  );
}

export default MemberList;
