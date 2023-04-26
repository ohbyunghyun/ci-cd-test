import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <div id="footer-container">
        <div id="footer-space-container"></div>
        <div id="footer-logo-container"></div>
        <div id="footer-menu-container">
          <div id="footer-menu-item">
            <Link to="/">
              <p id="menu-item">소개</p>
            </Link>
          </div>
          <div id="footer-menu-item">
            <Link to="/faq">
              <p id="menu-item">이용약관</p>
            </Link>
          </div>
          <div id="footer-menu-item">
            <Link to="/feed">
              <p id="menu-item">피드</p>
            </Link>
          </div>
          <div id="footer-menu-item">
            <Link to="/faq">
              <p id="menu-item">자주묻는 질문</p>
            </Link>
          </div>
          <div id="footer-menu-item">
            <Link to="/personalSetting">
              <p id="menu-item">설정</p>
            </Link>
          </div>
        </div>
        <div id="footer-info-container">
          <div id="footer-info-item">
            아티파이 | 대표자: 5팀 <br /> 서울특별시 강남구 819 3 삼오빌딩 5-8층
            (우편번호: 06244) <br />
            연락처: 010-0000-0000 | 사업자등록번호: 000-00-00000 <br />
            통신판매업 신고번호: 제2023-서울강남-00000호
            <br />
            클라우드 호스팅: Naver Cloud Platform
          </div>
          <div id="footer-logo-item">Artify</div>
        </div>
        <div id="footer-git-container">
          <Link to="https://github.com/das7945" target="_blank">
            <div id="footer-git" className="git1"></div>
          </Link>
          <Link to="https://github.com/jongkwangyun" target="_blank">
            <div id="footer-git" className="git2"></div>
          </Link>
          <Link to="https://github.com/fantasyshrimp" target="_blank">
            <div id="footer-git" className="git3"></div>
          </Link>
          <Link to="https://github.com/ohbyunghyun" target="_blank">
            <div id="footer-git" className="git4"></div>
          </Link>
          <Link to="https://github.com/zyoonshin" target="_blank">
            <div id="footer-git" className="git5"></div>
          </Link>
        </div>
        <div id="footer-bottom-container">
          <div id="footer-bottom-item">
            Copyright (c) 비트캠프 All rights reserved.
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
