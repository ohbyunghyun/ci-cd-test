import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function Point(props) {
  const [textValue, setTextValue] = useState("");
  const [mypoint, setMyPoint] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);

  const handleTextChange = (event) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      // 입력 값이 숫자인 경우
      if (parseInt(value) > parseInt(mypoint)) {
        setTextValue(mypoint.toString());
      } else {
        setTextValue(value);
      }
    } else {
      // 입력 값이 숫자가 아닌 경우
      setTextValue("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(
        "http://localhost:8080/point",
        {},
        {
          params: {
            boardNo: props.boardNo,
            getMemberNo: props.writerNo,
            point: textValue,
          },
        }
      )
      .then((response) => {
        if (response.data.status === "success") {
          props.PointModalHandler();
          setIsUpdated(!isUpdated);
          setTextValue("");
        } else {
          // alert("입력실패");
          Swal.fire({
            title: "입력 실패 했습니다. 잠시 후 다시 시도해 주세요.",
            confirmButtonText: "확인",
          });
        }
      })
      .catch((error) => {
        // alert("로그인 후 입력가능합니다.");
        Swal.fire({
          title: "로그인 후 입력가능합니다.",
          confirmButtonText: "확인",
        });
      });
  };

  useEffect(() => {
    axios.get("http://localhost:8080/point/member").then((response) => {
      setMyPoint(response.data);
    });
  }, [isUpdated]);

  const numberWithCommas = (number) => {
    // 천의 자리마다 , 찍기
    return number
      ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      : "0";
  };

  return (
    <>
      <div
        id="modal-background"
        style={{
          opacity: 0.3,
          backgroundColor: "black",
          pointerEvents: "all",
          cursor: "Default",
        }}
        onClick={props.PointModalHandler}
      ></div>
      <div id="money-main">
        <div id="report-title">
          <span
            id="report-close"
            onClick={props.PointModalHandler}
            className={`btn-close btn-close-${
              localStorage.getItem("isLightMode") === "true" ? "dark" : "white"
            }`}
          ></span>
          기부 하기
        </div>
        <div id="report-contentbox">
          <div id="menu-box">
            <input
              id="feed-modal-moneyinput"
              type="text"
              value={textValue}
              onChange={handleTextChange}
            ></input>
            <div id="feed-money-credit">
              보유 포인트: {numberWithCommas(mypoint)}
            </div>
            <div id="btn-div">
              <div
                id="money-btn"
                onClick={handleSubmit}
                className="btn btn-primary"
              >
                기부
              </div>
              <div
                id="money-btn2"
                onClick={props.PointModalHandler}
                className="btn btn-secondary"
              >
                취소
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Point;
