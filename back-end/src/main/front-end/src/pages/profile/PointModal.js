import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "./FollowListModal.css";
import axios from "axios";

Modal.setAppElement("#root");

function PointModal(props) {
  const [pointLog, setPointLog] = useState([]);
  let toPoint = props.totalpoint;

  useEffect(() => {
    axios.get("http://localhost:8080/point/log").then((response) => {
      setPointLog(response.data);
    });
  }, [props.isOpen]);

  function getTypeName(type) {
    switch (type) {
      case 1:
        return "댓글 작성 보너스";
      case 2:
        return "좋아요 보너스";
      case 3:
        return "게시글 작성 보너스";
      case 4:
        return "로그인 보너스";
      case 5:
        return "회원가입 보너스";
      case 6:
        return "유저간 후원";
      default:
        return "";
    }
  }

  const numberWithCommas = (number) => {
    // 천의 자리마다 , 찍기
    return number
      ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      : "0";
  };

  let beforeItem = { point: 0 };
  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}
      style={{
        overlay: { backgroundColor: `var(--aim-harf-alpa)` },
        content: {
          width: "380px",
          height: "500px",
          margin: "auto",
          backgroundColor: `var(--aim-base-tone)`,
          border: "none",
          boxShadow: `0 2px 8px var(--aim-fill-alpa)`,
          overflow: "auto",
          display: "flex",
          justifyContent: "center",
        },
      }}
    >
      <div id="point">
        {pointLog.map((item, index) => {
          if (beforeItem.getMemberNo !== undefined) {
            if (props.memberNo === beforeItem.getMemberNo) {
              toPoint -= beforeItem.point;
            } else if (props.memberNo !== beforeItem.getMemberNo) {
              toPoint += beforeItem.point;
            }
          }
          beforeItem = item;

          return (
            <div id="point-log" key={index}>
              <div id="point-log-content">
                <div id="point-log-title">{getTypeName(item.type)}</div>
                {props.memberNo === item.getMemberNo && (
                  <div id="point-log-getpoint">+ {item.point}</div>
                )}
                {props.memberNo !== item.getMemberNo && (
                  <div id="point-log-sendpoint">- {item.point}</div>
                )}
              </div>
              <div id="point-log-time">{item.getDt}</div>
              <div id="point-log-total">
                누적 포인트 : {numberWithCommas(toPoint)}
              </div>
            </div>
          );
        })}
      </div>
    </Modal>
  );
}

export default PointModal;
