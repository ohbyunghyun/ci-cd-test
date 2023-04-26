import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MemberList from "./MemberList";
import BoardList from "./BoardList";
import CommentList from "./CommentList";

function Management() {
  const location = useLocation();

  const [menuNo, setMenuNo] = useState(
    location.state ? location.state.menuNo : 0
  );
  console.log(location.state);
  const menu = ["회원 관리", "게시물 관리", "댓글 관리"];

  const [flexDirection, setFlexDirection] = useState("row");
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 800) {
        setFlexDirection("column");
      } else {
        setFlexDirection("row");
      }
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        height: "83vh",
        width: "100vw",
        minWidth: "600px",
      }}
    >
      <div
        style={{
          width: "14.3%",
          minWidth: "100px",
          height: "100%",
          marginLeft: "5%",
          boxSizing: "border-box",
          borderRight: `solid 1px var(--aim-border)`,
          color: `var(--aim-text-default)`,
        }}
      >
        <div style={{ height: "20%" }}></div>
        <div style={{ marginRight: "5%" }}>
          <h2 style={{ boxSizing: "border-box" }}>설정</h2>

          {menu.map((title, index) => {
            return (
              <div
                key={title + index}
                onClick={() => {
                  setMenuNo(index);
                }}
              >
                {title}
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ width: "90%", height: "100%" }}>
        {menuNo === 0 && (
          <MemberList title={menu[0]} flexDirection={flexDirection} />
        )}
        {menuNo === 1 && <BoardList title={menu[1]} />}
        {menuNo === 2 && <CommentList title={menu[2]} />}
      </div>
    </div>
  );
}

export default Management;
