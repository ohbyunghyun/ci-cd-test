// Faq.js
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import FaqTitleContent from "./FaqTitleContent";
import "./Faq.css";
import { Nav } from "react-bootstrap";

function Faq() {
  const location = useLocation();
  const [menuNo, setMenuNo] = useState(
    location.state ? location.state.menuNo : 0
  );
  const menu = [
    { title: "Artify 기능", faq_type_no: 1 },
    { title: "계정관리", faq_type_no: 2 },
    { title: "공개범위 및 보안", faq_type_no: 3 },
    { title: "정책 및 신고", faq_type_no: 4 },
    { title: "지원관리", faq_type_no: 5 },
  ];

  return (
    <div
      style={{
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
            // backgroundColor: "gray"
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
            고객센터
          </div>
          <Nav
            style={{
              marginLeft: "15px",
              // backgroundColor: "blue",
            }}
            className="flex-column"
            defaultActiveKey="#"
          >
            {menu.map((item, index) => {
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
                    key={item.title + index}
                    onClick={() => {
                      console.log("Selected faq_type_no:", item.faq_type_no);
                      setMenuNo(index);
                    }}
                    style={{
                      fontSize: "16px",
                      cursor: "pointer",
                      padding: "5px",
                      // borderBottom: `solid 1px var(--aim-border)`,
                    }}
                  >
                    {item.title}
                  </div>
                </Nav.Link>
              );
            })}
          </Nav>
        </div>
      </div>
      <div id="faqContent">
        {menuNo === 0 && (
          <FaqTitleContent
            selectedType={menu[0].faq_type_no}
            title={menu[0].title}
          />
        )}
        {menuNo === 1 && (
          <FaqTitleContent
            selectedType={menu[1].faq_type_no}
            title={menu[1].title}
          />
        )}
        {menuNo === 2 && (
          <FaqTitleContent
            selectedType={menu[2].faq_type_no}
            title={menu[2].title}
          />
        )}
        {menuNo === 3 && (
          <FaqTitleContent
            selectedType={menu[3].faq_type_no}
            title={menu[3].title}
          />
        )}
        {menuNo === 4 && (
          <FaqTitleContent
            selectedType={menu[4].faq_type_no}
            title={menu[4].title}
          />
        )}
      </div>
    </div>
  );
}

export default Faq;
