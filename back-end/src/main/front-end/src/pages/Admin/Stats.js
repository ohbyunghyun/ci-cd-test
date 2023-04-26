import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Visitor from "./Visitor";
import BoardReply from "./BoardReply";
import "./Stats.css";
import { Nav } from "react-bootstrap";

function Stats() {
  const location = useLocation();
  const [menuNo, setMenuNo] = useState(
    location.state ? location.state.menuNo : 0
  );
  const menu = ["방문자 주간조회", "콘텐츠 일별조회"];

  return (
    <div
      style={{
        display: "flex",
        height: "95vh",
        width: "100vw",
        minWidth: "1200px",
        // backgroundColor: "gray",
      }}
    >
      <div
        style={{
          minWidth: "250px",
          height: "100%",
          boxSizing: "border-box",
          borderRight: `solid 1px var(--aim-border)`,
          color: `var(--aim-text-default)`,
          // backgroundColor: "gray",
        }}
      >
        <div
          style={{
            height: "200px",
            // backgroundColor: "gray",
          }}
        ></div>
        <div
          style={{
            marginLeft: "60px",
            // backgroundColor: "blue",
          }}
        >
          <div
            style={{
              fontSize: "35px",
              paddingBottom: "5px",
              marginLeft: "5px",
              boxSizing: "border-box",
              cursor: "default",
            }}
          >
            통계
          </div>
          <Nav
            style={{
              marginLeft: "15px",
              // backgroundColor: "blue",
            }}
            className="flex-column"
            defaultActiveKey="#"
          >
            {menu.map((title, index) => {
              return (
                <Nav.Link
                  eventKey={index}
                  className={`personalSetting-menu ${
                    index === menuNo ? "active" : ""
                  }`}
                  href={index === 0 && "#"}
                  style={{
                    padding: "0px",
                    // backgroundColor: "blue",
                  }}
                >
                  <div
                    key={title + index}
                    onClick={() => {
                      setMenuNo(index);
                    }}
                    style={{
                      fontSize: "16px",
                      cursor: "pointer",
                      padding: "5px",
                      // borderBottom: `solid 1px var(--aim-border)`,
                      // backgroundColor: "blue",
                    }}
                  >
                    {title}
                  </div>
                </Nav.Link>
              );
            })}
          </Nav>
        </div>
      </div>
      <div id="Stats-content">
        {menuNo === 0 && <Visitor title={menu[0]} />}
        {menuNo === 1 && <BoardReply title={menu[1]} />}
      </div>
    </div>
  );
}

export default Stats;
