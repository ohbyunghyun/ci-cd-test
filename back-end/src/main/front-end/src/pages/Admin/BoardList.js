import React, { useEffect, useState } from "react";
import styles from "./BoardList.module.css";
import Table from "react-bootstrap/Table";
import axios from "axios";
import BoardView from "./BoardView";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import NavBar from "./NavBar";

function BoardList(props) {
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedNo, setSelectedNo] = useState();
  const navigate = useNavigate();

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
      .get("http://localhost:8080/admin/board")
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => console.error(error));
  }, []);

  function handleBoardSelect(selectedNo) {
    if (!selectedNo) {
      return;
    }
    setSelectedNo(selectedNo);
    setModalShow(true);
  }

  return (
    <>
      <div className={styles.BoardList}>
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
              <th>게시글번호</th>
              <th>닉네임</th>
              <th>원본내용</th>
              <th>요약내용</th>
              <th>번역내용</th>
              <th>작성일</th>
              <th>수정일</th>
              <th>신고횟수</th>
            </tr>
          </thead>
          <tbody>
            {data.map((board) => (
              <tr key={board.boardNo}>
                <td onClick={() => handleBoardSelect(board.boardNo)} readOnly>
                  {board.boardNo}
                </td>
                <td onClick={() => handleBoardSelect(board.boardNo)} readOnly>
                  {board.writer.nickname}
                </td>
                <td onClick={() => handleBoardSelect(board.boardNo)} readOnly>
                  {board.originContent.length > 20
                    ? board.originContent.substr(0, 20) + "..."
                    : board.originContent}
                </td>
                <td onClick={() => handleBoardSelect(board.boardNo)} readOnly>
                  {board.summaryContent.length > 20
                    ? board.summaryContent.substr(0, 20) + "..."
                    : board.summaryContent}
                </td>
                <td onClick={() => handleBoardSelect(board.boardNo)} readOnly>
                  {board.transContent.length > 20
                    ? board.transContent.substr(0, 20) + "..."
                    : board.transContent}
                </td>

                <td onClick={() => handleBoardSelect(board.boardNo)} readOnly>
                  {board.writeDt.substr(0, 10)}
                </td>
                <td onClick={() => handleBoardSelect(board.boardNo)} readOnly>
                  {board.updateDt.substr(0, 10)}
                </td>
                <td onClick={() => handleBoardSelect(board.boardNo)} readOnly>
                  {board.reportCnt}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <BoardView show={modalShow} setShow={setModalShow} no={selectedNo} />
      {/* <CommentView show={modalShow} setShow={setModalShow} no={selectedNo} /> */}
    </>
  );
}

export default BoardList;
