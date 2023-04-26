import React, { useState } from "react";

function BoardUpdate(props) {
  const [textareaValue, setTextareaValue] = useState("");

  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
    console.log(textareaValue);
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
        onClick={props.UpdateModalHandler}
      ></div>
      <div id="report-main">
        <div id="report-title">
          <span id="report-close" onClick={props.UpdateModalHandler}>
            &times;
          </span>
          게시글 수정
        </div>
        <div id="report-contentbox">
          <div id="report-box">
            <div id="report-text">
              <textarea
                id="menu-textarea"
                name="content"
                onChange={handleTextareaChange}
              >
                {props.originContent}
              </textarea>
            </div>
            <div
              id="report-btn"
              onClick={props.closeModal}
              // onClick={handleSubmit}
            >
              제출
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BoardUpdate;
