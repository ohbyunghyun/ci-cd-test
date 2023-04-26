import React, { useState, useEffect, useRef } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import authBtnStyle from "./style";
import axios from "axios";
import ExternalLogin from "./ExternalLogin";
import Swal from "sweetalert2";
axios.defaults.withCredentials = true;

function LoginModal(props) {
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const emailRef = useRef(null);

  const handleClose = () => {
    props.setShowExternalLogin(true);
    props.setLoginShow(false);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleClickLogin();
    }
  };

  const handleClickLogin = (e) => {
    const email = document.getElementsByName("email")[0].value;
    if (!email.includes("@")) {
      document.querySelector("#emailHelpBlock").innerText =
        "이메일 형식이 올바르지 않습니다.";
      setValidEmail(false);
      return;
    } else {
      document.querySelector("#emailHelpBlock").innerText = "";
      setValidEmail(true);
    }

    const password = document.getElementsByName("password")[0].value;
    if (password.length === 0) {
      document.querySelector("#passwordHelpBlock").innerText =
        "비밀번호를 입력하세요";
      setValidPassword(false);
      document.getElementsByName("password")[0].focus();
      return;
    }
    if (password.length === 10) {
      setValidPassword(true);
    } else {
      document.querySelector("#passwordHelpBlock").innerText = "";
    }

    axios
      .post(
        "http://localhost:8080/auth/login",
        {},
        {
          params: {
            email: email,
            password: password,
          },
        }
      )
      .then((response) => {
        if (response.data.status === "success") {
          handleClose();
          window.location.reload();
        } else if (
          response.data.status === "failure" &&
          response.data.errorCode === "402"
        ) {
          // alert("메일 인증 후 로그인 하세요.");
          Swal.fire({
            title: "메일 인증 후 로그인 하세요.",
            confirmButtonText: "확인",
          });
          return;
        } else {
          document.querySelector("#passwordHelpBlock").innerText =
            "이메일 또는 비밀번호가 틀렸습니다.";
        }
      })
      .catch((error) => {
        // alert("로그인 중 오류 발생");
        Swal.fire({
          title: "로그인 중 오류가 발생 했습니다. 잠시 후 다시 시도해 주세요.",
          confirmButtonText: "확인",
        });
      });
  };

  const checkEmail = () => {
    const email = document.getElementsByName("email")[0].value;
    document.querySelector("#passwordHelpBlock").innerText = "";

    if (!email.includes("@")) {
      setValidEmail(false);
      return;
    } else {
      setValidEmail(true);
    }
  };

  const handleChangePassword = () => {
    if (document.getElementsByName("password")[0].value.length > 0) {
      document.querySelector("#passwordHelpBlock").innerText = "";
      setValidPassword(true);
    } else {
      document.querySelector("#passwordHelpBlock").innerText =
        "비밀번호를 입력하세요";
      setValidPassword(false);
    }
  };

  const isDisabled = () => {
    return !(validEmail && validPassword);
  };

  useEffect(() => {
    // 모달 열렸을 때 오토포커스 주기
    if (props.loginShow) {
      const emailInput = document.getElementsByName("email")[0];
      if (emailInput) {
        emailRef.current.focus();
      }
    }
  }, [props.loginShow]);

  const handleClickSignup = () => {
    handleClose();
    props.setSignupShow(true); // AuthBtn.js 에서 상태 관리
    props.setShowExternalLogin(false);
    props.setIsLoginModal(false);
  };

  const handleClickFindPw = () => {
    handleClose();
    props.setFindPwShow(true);
    props.setShowExternalLogin(false);
    props.setIsLoginModal(false);
  };

  return (
    <>
      <Modal
        show={props.loginShow}
        onHide={handleClose}
        centered
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: `var(--aim-base-alpa)`,
          border: "none",
        }}
        contentClassName="bg-dark"
        className="blur-modal"
      >
        <Modal.Header
          closeButton
          closeVariant={
            localStorage.getItem("isLightMode") === "true" ? "dark" : "white"
          }
          style={{ borderBottom: "none" }}
        ></Modal.Header>
        <Modal.Header
          style={{ borderBottom: "none", borderRadius: "0" }}
          className="d-flex justify-content-center p-0 pt-2 pb-2"
        >
          <Modal.Title
            className={`text-${
              localStorage.getItem("isLightMode") === "true" ? "dark" : "light"
            }`}
          >
            로그인
          </Modal.Title>
        </Modal.Header>

        <Form>
          <Modal.Body
            className="p-5 pb-4 pt-4"
            style={{ backgroundColor: `var(--aim-base-tone)` }}
          >
            <Form.Group className="mb-4" controlId="email">
              <Form.Label
                className={`text-${
                  localStorage.getItem("isLightMode") === "true"
                    ? "dark"
                    : "light"
                }`}
              >
                이메일
              </Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="name@naver.com"
                onChange={checkEmail}
                onKeyDown={handleEnter}
                ref={emailRef}
                autoComplete="username"
                style={{
                  color: `var(--aim-text-default)`,
                  backgroundColor: `var(--aim-base-tone)`,
                }}
              />
              <Form.Text id="emailHelpBlock"></Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label
                className={`text-${
                  localStorage.getItem("isLightMode") === "true"
                    ? "dark"
                    : "light"
                }`}
              >
                비밀번호
              </Form.Label>
              <Form.Control
                type="password"
                name="password"
                onChange={handleChangePassword}
                onKeyDown={handleEnter}
                autoComplete="current-password"
                style={{
                  color: `var(--aim-text-default)`,
                  backgroundColor: `var(--aim-base-tone)`,
                }}
              />
              <Form.Text id="passwordHelpBlock"></Form.Text>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer
            style={{ borderTop: "none" }}
            className="d-flex flex-column justify-content-center pt-2 pb-4 ps-5 pe-5"
          >
            <Button
              variant="primary"
              type="button"
              onClick={handleClickLogin}
              style={authBtnStyle}
              disabled={isDisabled()}
              className="mb-4"
            >
              로그인
            </Button>
            <div>
              {props.showExternalLogin && (
                <ExternalLogin isLoginModal={props.isLoginModal} />
              )}
            </div>
            <div
              className={` mt-4 mb-2 text-${
                localStorage.getItem("isLightMode") === "true"
                  ? "dark"
                  : "light"
              }`}
            >
              <span>아직 계정이 없으신가요? </span>
              <span className="login-modal-signup" onClick={handleClickSignup}>
                회원가입
              </span>
            </div>
            <div
              className="mb-3 login-modal-forget-pw"
              onClick={handleClickFindPw}
            >
              비밀번호를 잊으셨나요?
            </div>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default LoginModal;
