import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AlarmInfo(props) {
  const { log, giver } = props.data;
  const receiver = props.receiver;
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [isRead, setIsRead] = useState(log.readFlag);
  const navigate = useNavigate();
  //navigate('/Profile', { state: { no: no } });

  function moveDirect() {
    setIsRead(true);

    axios.put(`http://localhost:8080/alarm/${log.logNo}`).then((response) => {
      if (response.data.status === "failure") {
        navigate("/");
      }
    });
    switch (log.typeNo) {
      case 11:
        navigate("/Profile", {
          state: {
            no: log.memberNo,
            directModal: { type: "board", no: log.contentNo },
          },
        });
        break;
      case 14:
        navigate("/Profile", {
          state: {
            no: receiver.no,
            directModal: { type: "board", no: log.contentNo },
          },
        });
        break;
      case 21:
        navigate("/Profile", {
          state: {
            no: receiver.no,
            directModal: { type: "reply", no: log.contentNo },
          },
        }); //내 게시글에 댓글이 달림
        break;
      case 24:
        console.log("내댓글에 좋아요 로그");
        break;
      case 31:
        navigate("/Profile", {
          state: {
            no: receiver.no,
            directModal: { type: "follow", no: giver.contentNo },
          },
        });
        break;
      default:
    }
  }

  const handleMouseOver = () => {
    setIsMouseOver(true);
  };

  const handleMouseLeave = () => {
    setIsMouseOver(false);
  };

  //{log.typeNo}에 따라 클릭이벤트가 분기
  return (
    <div
      onClick={moveDirect}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      style={{
        width: "100%",
        height: "60px",
        minWidth: "600px",
        padding: "5px 0px",
        marginLeft: "50px",
        display: "flex",
        backgroundColor: isMouseOver
          ? `var(--aim-base-tone)`
          : `var(--aim-base-alpa)`,
        boxSizing: "border-box",
        borderBottom: "1px solid white",
        color: isRead ? `var(--aim-text-sub)` : `var(--aim-text-default)`,
      }}
      className="alarm-info-log"
    >
      <div style={{ width: "80%" }}>
        <img
          src={giver.profilePhoto}
          alt={"profile img"}
          style={{
            width: "50px",
            height: "50px",
            marginRight: "10px",
            borderRadius: "50%",
            backgroundColor: `var(--aim-img-background)`,
          }}
        />
        <span>
          {" "}
          {giver.nickname}님이 {log.content}
        </span>
      </div>
      <div
        style={{
          paddingLeft: "5px",
          borderLeft: `1px solid var(--aim-border)`,
        }}
      >
        {log.recordDate}
      </div>
    </div>
  );
}

export default AlarmInfo;
