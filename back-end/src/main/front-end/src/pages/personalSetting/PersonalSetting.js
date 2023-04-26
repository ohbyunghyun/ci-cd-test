import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ModifyProfile from "./ModifyProfile";
import PublicSetting from "./PublicSetting";
import AlamSetting from "./AlamSetting";
import PersonalAlarms from "./PersonalAlarms";
import { Nav } from "react-bootstrap";

function PersonalSetting() {
  const location = useLocation();

  const [menuNo, setMenuNo] = useState(
    location.state ? location.state.menuNo : 0
  );
  const menu = ["프로필 수정", "공개 설정", "알람 설정", "전체 알람"];

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
        // backgroundColor: "gray",
        display: "flex",
        height: "95vh",
        width: "100vw",
        minWidth: "1200px",
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
            설정
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
                  key={title}
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

      <div
        //  폭 수정해야함
        style={{
          height: "100vh",
          display: "flex",
          justifycontent: "center",
          fontsize: "0",
          width: "70%",
          //height: "90%",
          margin: "auto",
          // backgroundColor: "red",
        }}
      >
        {menuNo === 0 && (
          <ModifyProfile title={menu[0]} flexDirection={flexDirection} />
        )}
        {menuNo === 1 && <PublicSetting title={menu[1]} />}
        {menuNo === 2 && <AlamSetting title={menu[2]} />}
        {menuNo === 3 && <PersonalAlarms title={menu[3]} />}
      </div>
    </div>
  );
}

export default PersonalSetting;
