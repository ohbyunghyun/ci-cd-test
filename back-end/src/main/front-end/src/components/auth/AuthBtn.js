import React, { useState, useEffect } from "react";
import { SignupModal, LoginModal, Logout, AuthModal } from "../auth";
import { Nav } from "react-bootstrap";
import { Bell, BellFill } from "react-bootstrap-icons";
import AlarmModal from "../AlarmModal";
import axios from "axios";
import { resolvePath } from "react-router-dom";
import Swal from "sweetalert2";
axios.defaults.withCredentials = true;

function AuthBtn(props) {
  const [show, setShow] = useState(false);
  const { currentUser, setCurrentUser } = props;
  const { loginShow, setLoginShow } = props;
  const { signupShow, setSignupShow } = props;
  const [alarms, setAlarms] = useState(null);
  const [alarmShow, setAlarmShow] = useState(false);
  const [alarmClickEvent, setAlarmClickEvent] = useState(null);

  const handleLoginShow = () => {
    setLoginShow(!loginShow);
    props.setIsLoginModal(true);
  };

  const handleSignupShow = () => {
    setSignupShow(true);
    props.setIsLoginModal(false);
  };

  const handleClickUser = () => {
    setShow(true);
  };

  const handleClickBell = (e) => {
    e.preventDefault();
    setAlarmShow(true);
    setAlarmClickEvent(e);
    return <></>;
  };

  useEffect(() => {
    if (currentUser !== null) {
      const fetchData = async () => {
        axios(`http://localhost:8080/alarm/public`) //
          .then((response) => {
            if (response.status === 200) {
              setAlarms(response.data);
            } else {
              // console.log("failure 발생");
            }
          })
          .catch((error) => {
            // alert("alarm 가져오는 중 오류 발생!");
            Swal.fire({
              title:
                "알람 정보를 불러오는 중 오류 발생가 발생 했습니다. 잠시 후 다시 시도해 주세요.",
              confirmButtonText: "확인",
            });
          });
      };

      fetchData();
    }
  }, [currentUser]);

  // alarms.logData 배열에서 log.readFlag가 false인 요소가 있는지 확인하는 함수
  const hasUnreadAlarms = () => {
    if (!alarms || !alarms.logData) return false;
    return alarms.logData.some((element) => !element.log.readFlag);
  };

  useEffect(() => {
    const authHasAlarmElement = document.querySelector("#auth-has-alarm");
    if (authHasAlarmElement) {
      if (alarms !== null && hasUnreadAlarms()) {
        authHasAlarmElement.style.visibility = "visible";
      } else {
        authHasAlarmElement.style.visibility = "hidden";
      }
    }
  }, [alarms, hasUnreadAlarms]);

  const markAllAlarmsAsRead = () => {
    if (alarms && alarms.logData) {
      setAlarms({
        ...alarms,
        logData: alarms.logData.map((element) => ({
          ...element,
          log: { ...element.log, readFlag: true },
        })),
      });
    }
  };

  return (
    <>
      {currentUser ? (
        <>
          <a
            href=""
            className="d-flex align-items-center me-1"
            onClick={handleClickBell}
          >
            <div
              className="d-flex justify-content-center align-items-center"
              id="auth-has-alarm"
              style={{
                width: "8px",
                height: "8px",
                backgroundColor: `var(--aim-emphasis-red)`,
                borderRadius: "50%",
                position: "relative",
                left: "21px",
                bottom: "8px",
                visibility: "hidden",
                // color: `var(--aim-text-default)`,
                fontSize: "9px",
              }}
            ></div>
            <Bell size="1.4rem" style={{ color: `var(--aim-text-default)` }} />
          </a>
          <Nav.Link
            onClick={handleClickUser}
            style={{ padding: "0" }}
            className="d-flex"
          >
            <div
              className="ms-2 me-2 d-flex align-items-center"
              style={{ display: "inline-block" }}
            >
              {currentUser.nickname}
            </div>
            <div
              key={currentUser.profilePhoto}
              style={{
                backgroundImage: `url(${currentUser.profilePhoto})`,
                backgroundSize: "cover",
                width: "40px",
                height: "40px",
                display: "inline-block",
                borderRadius: "50%",
              }}
            />
          </Nav.Link>
        </>
      ) : (
        <>
          <Nav.Link>
            <div onClick={handleSignupShow}>회원가입</div>
          </Nav.Link>
          <Nav.Link>
            <div onClick={handleLoginShow}>로그인</div>
          </Nav.Link>
        </>
      )}

      <AuthModal
        show={show}
        setShow={setShow}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        message={props.message}
      />

      <AlarmModal
        alarms={alarms}
        setAlarms={setAlarms}
        alarmShow={alarmShow}
        setAlarmShow={setAlarmShow}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        alarmClickEvent={alarmClickEvent}
        setAlarmClickEvent={setAlarmClickEvent}
        setSignupShow={setSignupShow}
        markAllAlarmsAsRead={markAllAlarmsAsRead}
      />
    </>
  );
}

export default AuthBtn;
