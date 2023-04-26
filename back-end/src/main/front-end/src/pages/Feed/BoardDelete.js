import React from "react";
import axios from "axios";
import Swal from "sweetalert2";

function BoardDelete(props) {
  const replyNos = props.reply.map((reply) => reply.replyNo);

  function deleteBoard(boardNo) {
    axios
      .delete(`http://localhost:8080/boards/${boardNo}`, {
        data: replyNos,
      })
      .then((response) => {
        // alert("삭제되었습니다!");
        Swal.fire({
          title: "삭제 되었습니다.",
          confirmButtonText: "확인",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      <div
        id="modal-background"
        style={{
          opacity: 0.3,
          backgroundColor: `var(--aim-base-tone-down)`,
          pointerEvents: "all",
          cursor: "Default",
        }}
        onClick={props.DeleteModalHandler}
      ></div>
      <div id="report-delete">
        <div id="report-title">
          <span
            id="report-close"
            onClick={props.DeleteModalHandler}
            className={`btn-close btn-close-${
              localStorage.getItem("isLightMode") === "true" ? "dark" : "white"
            }`}
          ></span>
          게시글 삭제
        </div>
        <div id="report-contentbox">
          <div id="menu-box">
            <div id="menu-text">정말 삭제하시겠습니까?</div>
            <div id="btn-div">
              <div
                id="menu-btn"
                onClick={() => {
                  deleteBoard(props.boardNo);
                  props.closeModal();
                }}
                className="btn btn-primary"
              >
                예
              </div>
              <div
                id="menu-btn2"
                onClick={props.DeleteModalHandler}
                className="btn btn-secondary"
              >
                아니오
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BoardDelete;
