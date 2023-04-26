import "./styles/App.css";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbars from "./components/Navbars";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Feed from "./pages/Feed/Feed";
import Faq from "./pages/Faq/Faq";
import FaqControl from "./pages/Faq/FaqControl";
import Profile from "./pages/profile/Profile";
import PersonalSetting from "./pages/personalSetting/PersonalSetting";
import MemberList from "./pages/Admin/MemberList";
import Stats from "./pages/Admin/Stats";
import {
  LoginModal,
  SignupModal,
  FindPwModal,
  FindPw2Modal,
  FindPw3Modal,
} from "./components/auth";
import NaverLoginHandler from "./handler/NaverLoginHandler";
import EmailVerifyHandler from "./handler/EmailVerifyHandler";
import SSEProvider from "./handler/SSEProvider";
import SSEContext from "./handler/SSEContext";
import axios from "axios";
import BoardList from "./pages/Admin/BoardList";
import CommentList from "./pages/Admin/CommentList";
import Management from "./pages/Admin/Management";

// 로컬스토리지 강제 삭제
// function clearLocalStorage() {
//   localStorage.clear();
// }
// clearLocalStorage();

const getKSTDate = () => {
  const now = new Date();
  const timezoneOffset = now.getTimezoneOffset() * 60 * 1000;
  const kstOffset = 9 * 60 * 60 * 1000;
  const kstDate = new Date(now.getTime() + timezoneOffset + kstOffset);

  const year = kstDate.getFullYear();
  const month = String(kstDate.getMonth() + 1).padStart(2, "0");
  const day = String(kstDate.getDate()).padStart(2, "0");
  const hours = String(kstDate.getHours()).padStart(2, "0");
  const minutes = String(kstDate.getMinutes()).padStart(2, "0");
  const seconds = String(kstDate.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const useVisitorCheck = (sendVisitorData) => {
  const removeVisitorKeyAfterTimeout = () => {
    setTimeout(() => {
      localStorage.removeItem("visitor");
    }, 10 * 60 * 1000); // 10분 뒤 로컬스토리지 삭제
  };

  useEffect(() => {
    const checkAndSendVisitorData = async () => {
      const currentDate = new Date();
      const lastVisitedDate = localStorage.getItem("visitor");

      if (
        !lastVisitedDate ||
        new Date(lastVisitedDate).toLocaleDateString() !==
          currentDate.toLocaleDateString()
      ) {
        const kstDate = getKSTDate();
        localStorage.setItem("visitor", kstDate);
        sendVisitorData();
        removeVisitorKeyAfterTimeout();
      }
    };

    checkAndSendVisitorData();
  }, [sendVisitorData]);

  useEffect(() => {
    removeVisitorKeyAfterTimeout();
  }, []);
};

function App() {
  const [loginShow, setLoginShow] = useState(false);
  const [signupShow, setSignupShow] = useState(false);
  const [isLoginModal, setIsLoginModal] = useState(null);
  const [showExternalLogin, setShowExternalLogin] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [findPwShow, setFindPwShow] = useState(false);
  const [findPw2Show, setFindPw2Show] = useState(false);
  const [findPw3Show, setFindPw3Show] = useState(false);
  const [findPwEmail, setFindPwEmail] = useState(null);
  const [isLightMode, setIsLightMode] = useState(
    JSON.parse(localStorage.getItem("isLightMode")) || false
  );

  const sendVisitorData = useCallback(async () => {
    try {
      const response = await axios.post("http://localhost:8080/visitors");

      if (response.status !== 200) {
        throw new Error(`HTTP error ${response.status}`);
      } else {
        console.log("방문자 데이터 전송 성공");
      }
    } catch (error) {
      console.error("실패 사유:", error);
    }
  }, []);

  useVisitorCheck(sendVisitorData);

  return (
    <>
      <div>
        <SSEProvider>
          <BrowserRouter>
            <Navbars
              isLoginModal={isLoginModal}
              setIsLoginModal={setIsLoginModal}
              showExternalLogin={showExternalLogin}
              setShowExternalLogin={setShowExternalLogin}
              loginShow={loginShow}
              setLoginShow={setLoginShow}
              signupShow={signupShow}
              setSignupShow={setSignupShow}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              isLightMode={isLightMode}
              setIsLightMode={setIsLightMode}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    isLoginModal={isLoginModal}
                    setIsLoginModal={setIsLoginModal}
                    showExternalLogin={showExternalLogin}
                    setShowExternalLogin={setShowExternalLogin}
                    loginShow={loginShow}
                    setLoginShow={setLoginShow}
                    signupShow={signupShow}
                    setSignupShow={setSignupShow}
                  />
                }
              ></Route>
              <Route
                path="/Feed"
                element={
                  <Feed
                    isLoginModal={isLoginModal}
                    setIsLoginModal={setIsLoginModal}
                    showExternalLogin={showExternalLogin}
                    setShowExternalLogin={setShowExternalLogin}
                    loginShow={loginShow}
                    setLoginShow={setLoginShow}
                    signupShow={signupShow}
                    setSignupShow={setSignupShow}
                  />
                }
              ></Route>
              <Route path="/Profile" element={<Profile />}></Route>
              <Route
                path="/PersonalSetting"
                element={<PersonalSetting />}
              ></Route>
              <Route path="/Faq" element={<Faq />} />
              <Route path="/FaqControl" element={<FaqControl />} />
              <Route
                path="/admin/member"
                element={
                  <MemberList
                    currentUser={currentUser}
                    setCurrentUser={setCurrentUser}
                    isLightMode={isLightMode}
                  />
                }
              />
              <Route path="/admin/stats" element={<Stats />} />
              <Route path="/admin/management" element={<Management />} />
              <Route
                path="/admin/board"
                element={<BoardList isLightMode={isLightMode} />}
              />
              <Route
                path="/admin/comment"
                element={<CommentList isLightMode={isLightMode} />}
              />

              <Route path="/auth/verify" element={<EmailVerifyHandler />} />
              <Route path="/auth/naverlogin" element={<NaverLoginHandler />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </SSEProvider>
      </div>

      <SignupModal
        signupShow={signupShow}
        setSignupShow={setSignupShow}
        setLoginShow={setLoginShow}
        showExternalLogin={signupShow}
        setShowExternalLogin={setShowExternalLogin}
        isLoginModal={isLoginModal}
        setIsLoginModal={setIsLoginModal}
      />

      <LoginModal
        loginShow={loginShow}
        setLoginShow={setLoginShow}
        setSignupShow={setSignupShow}
        setFindPwShow={setFindPwShow}
        showExternalLogin={loginShow}
        setShowExternalLogin={setShowExternalLogin}
        isLoginModal={isLoginModal}
        setIsLoginModal={setIsLoginModal}
      />

      <FindPwModal
        findPwShow={findPwShow}
        setFindPwShow={setFindPwShow}
        setFindPw2Show={setFindPw2Show}
        setFindPwEmail={setFindPwEmail}
      />

      <FindPw2Modal
        findPw2Show={findPw2Show}
        setFindPw2Show={setFindPw2Show}
        setFindPw3Show={setFindPw3Show}
        findPwEmail={findPwEmail}
        setFindPwEmail={setFindPwEmail}
      />

      <FindPw3Modal
        findPw3Show={findPw3Show}
        setFindPw3Show={setFindPw3Show}
        findPwEmail={findPwEmail}
        setFindPwEmail={setFindPwEmail}
      />
    </>
  );
}

export default App;
