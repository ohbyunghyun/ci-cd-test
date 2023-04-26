import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function Report(props) {
  const [reportMenu, setReportMenu] = useState([]);
  const [reportNum, setReportNum] = useState();
  const [reportTitle, setReportTitle] = useState("");
  const [select, setSelect] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");

  function selected() {
    setSelect(!select);
  }

  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/report`)
      .then((response) => setReportMenu(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(
        "http://localhost:8080/report",
        {},
        {
          params: {
            boardNo: props.boardNo,
            replyNo: props.commentNo,
            reportNo: reportNum,
            content: textareaValue,
          },
        }
      )
      .then((response) => {
        if (response.data.status === "success") {
          // alert("신고했습니다 !");
          Swal.fire({
            title: "신고 했습니다.",
            confirmButtonText: "확인",
          });
          props.handleCloseModal();
        } else {
          // alert("신고 실패");
          Swal.fire({
            title: "신고 실패 했습니다. 잠시 후 다시 시도해 주세요.",
            confirmButtonText: "확인",
          });
        }
      })
      .catch((error) => {
        // alert("중복신고입니다");
        Swal.fire({
          title: "중복 신고입니다.",
          confirmButtonText: "확인",
        });
      });
  };

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
        onClick={props.handleCloseModal}
      ></div>
      <div id="report-main">
        <div id="report-title">
          <div
            id="report-close"
            onClick={props.handleCloseModal}
            className={`btn-close btn-close-${
              localStorage.getItem("isLightMode") === "true" ? "dark" : "white"
            }`}
          ></div>
          신고
        </div>
        <div id="report-contentbox">
          {!select && (
            <>
              {reportMenu.map((item, index) => (
                <div
                  id="report-menu"
                  key={index}
                  onClick={() => {
                    setReportNum(item.reportNo);
                    setReportTitle(item.reportType);
                    selected();
                  }}
                >
                  {item.reportType}
                  <div
                    id="report-menuicon"
                    style={{
                      backgroundImage: `url(/next.png)`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center center",
                      backgroundSize: "cover",
                    }}
                  ></div>
                </div>
              ))}
            </>
          )}
          {select && (
            <>
              <div id="report-menu" onClick={selected}>
                {reportTitle}
                <div
                  id="report-menuicon"
                  style={{
                    backgroundImage: `url(/next.png)`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center",
                    backgroundSize: "cover",
                    transform: "rotate(180deg)",
                  }}
                ></div>
              </div>
              <div id="report-box">
                <div id="report-text">
                  <textarea
                    id="report-textarea"
                    name="content"
                    onChange={handleTextareaChange}
                  ></textarea>
                </div>
                <div
                  id="report-btn"
                  onClick={handleSubmit}
                  className="btn btn-primary"
                >
                  제출
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Report;
