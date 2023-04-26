import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FeedModal.css";
import Report from "./Report";
import Swal from "sweetalert2";

function CommentUtil(props) {
  const [likeCnt, setLikeCnt] = useState();
  const [isLike, setIsLike] = useState(false);
  const [likeUpdate, setLikeUpdate] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  function handleSubmit(event) {
    props.onUpdate();
  }

  useEffect(() => {
    axios
      .get("http://localhost:8080/reply/islike/" + props.commentNo)
      .then((response) => {
        if (response.data.data === "like") {
          setIsLike(true);
        } else {
          setIsLike(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleLike = () => {
    setIsLike(!isLike);

    if (isLike) {
      axios
        .delete("http://localhost:8080/reply/like/" + props.commentNo)
        .then((response) => {
          setLikeUpdate(!likeUpdate);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      axios
        .post(
          "http://localhost:8080/reply/like",
          {},
          {
            params: {
              replyNo: props.commentNo,
            },
          }
        )
        .then((response) => {
          setLikeUpdate(!likeUpdate);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  function CommentDel() {
    axios
      .delete(`http://localhost:8080/reply/delete/${props.commentNo}`)
      .then((response) => {
        if (response.data.status === "success") {
          handleSubmit();
        } else {
          // alert("삭제실패");
          Swal.fire({
            title: "삭제 실패 했습니다. 잠시 후 다시 시도해 주세요.",
            confirmButtonText: "확인",
          });
        }
      })
      .catch((error) => {});
  }

  useEffect(() => {
    axios
      .get(`http://localhost:8080/reply/like/${props.commentNo}`)
      .then((response) => setLikeCnt(response.data))
      .catch((error) => console.log(error));
  }, [likeUpdate]);

  return (
    <>
      <div id="feed-modal-commentutil">
        <div id="feed-modal-commentlike">좋아요 {likeCnt}개</div>
        <div
          id="feed-modal-replylike"
          style={{
            backgroundImage: isLike ? `url(/heart.png)` : `url(/unheart.png)`,
            backgroundSize: "cover",
          }}
          onClick={handleLike}
        ></div>
        {props.loginUserNo !== props.writerNo && (
          <div id="feed-modal-commentreport" onClick={openModal}>
            신고하기
          </div>
        )}
        {props.loginUserNo === props.writerNo && (
          <div id="feed-modal-commentdelete" onClick={CommentDel}>
            삭제하기
          </div>
        )}
      </div>
      {isModalOpen && (
        <Report
          commentNo={props.commentNo}
          handleCloseModal={handleCloseModal}
        />
      )}
    </>
  );
}

export default CommentUtil;
