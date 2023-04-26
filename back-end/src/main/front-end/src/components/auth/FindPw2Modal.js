import { useEffect, useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import "./style.css";
import axios from "axios";
import Swal from "sweetalert2";
axios.defaults.withCredentials = true;

function FindPw2Modal(props) {
  const [validAuthCode, setValidAuthCode] = useState(false);
  const [canResendClick, setCanResendClick] = useState(true);
  const authCodeRef = useRef(null);

  useEffect(() => {
    // 모달 열렸을 때 오토포커스 주기
    if (props.findPw2Show) {
      const authCodeInput = document.getElementsByName("auth-code")[0];
      if (authCodeInput) {
        authCodeRef.current.focus();
      }
    }
  }, [props.findPw2Show]);

  const handleClose = () => {
    props.setFindPw2Show(false);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleClickSubmit(e);
    }
  };

  const checkAuthCode = () => {
    const authCode = document.getElementsByName("auth-code")[0].value;
    document.querySelector("#authCodeHelpBlock").innerText = "";

    if (authCode.length === 0) {
      setValidAuthCode(false);
      return;
    } else {
      setValidAuthCode(true);
    }
  };

  const isDisabled = () => {
    return !validAuthCode;
  };

  const handleClickSubmit = (e) => {
    e.preventDefault();

    const email = props.findPwEmail;
    const authCode = document.getElementsByName("auth-code")[0].value;

    if (authCode.length === 0) {
      document.querySelector("#authCodeHelpBlock").innerText =
        "인증코드를 입력하세요.";
    }

    axios
      .get("http://localhost:8080/auth/authcode", {
        params: {
          email: email,
          authCode: authCode,
        },
      })
      .then((response) => {
        console.log(response);
        if (response.data.status === "success") {
          handleClose();
          props.setFindPw3Show(true);
        }
        if (
          response.data.status === "failure" &&
          response.data.errorCode === "403"
        ) {
          document.querySelector("#authCodeHelpBlock").innerText =
            "인증코드가 일치하지 않습니다.";
        }
      })
      .catch((error) => {
        // alert("인증코드 전송 중 오류 발생");
        Swal.fire({
          title:
            "인증코드 전송 중 오류가 발생 했습니다. 잠시 후 다시 시도해 주세요.",
          confirmButtonText: "확인",
        });
      });
  };

  const handleClickResend = () => {
    if (!canResendClick) return;

    const email = props.findPwEmail;
    const resend = document.querySelector(".findpw2-modal-resend");

    resend.classList.add("findpw2-modal-resend-clicked");
    setCanResendClick(false);

    setTimeout(() => {
      resend.classList.remove("findpw2-modal-resend-clicked");
      setCanResendClick(true);
    }, 2000);

    axios
      .put(
        "http://localhost:8080/auth/findpw",
        {},
        {
          params: {
            email: email,
          },
        }
      )
      .then((response) => {
        if (response.data.status === "success") {
          console.log(response);
        }
      })
      .catch((error) => {
        // alert("인증코드 전송 중 오류 발생");
        Swal.fire({
          title:
            "인증코드 전송 중 오류가 발생 했습니다. 잠시 후 다시 시도해 주세요.",
          confirmButtonText: "확인",
        });
      });
  };

  return (
    <>
      <Modal
        show={props.findPw2Show}
        onHide={handleClose}
        backdrop="static"
        centered
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: `var(--aim-base-alpa)`,
          border: "none",
        }}
        contentClassName="bg-dark"
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
            인증코드 입력
          </Modal.Title>
        </Modal.Header>

        <Form>
          <Modal.Body
            className="p-5 pb-4 pt-4"
            style={{ backgroundColor: `var(--aim-base-tone)` }}
          >
            <Form.Group className="mb-2" controlId="text">
              <Form.Label
                className={`text-${
                  localStorage.getItem("isLightMode") === "true"
                    ? "dark"
                    : "light"
                }`}
              >
                이메일로 받은 인증코드를 입력해 주세요.
              </Form.Label>
              <Form.Control
                type="text"
                name="auth-code"
                onChange={checkAuthCode}
                onKeyDown={handleEnter}
                ref={authCodeRef}
                style={{
                  color: `var(--aim-text-default)`,
                  backgroundColor: `var(--aim-base-tone)`,
                }}
              />
              <Form.Text id="authCodeHelpBlock"></Form.Text>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer
            style={{ borderTop: "none" }}
            className="d-flex flex-column justify-content-center pt-2 pb-4 ps-5 pe-5"
          >
            <div
              className="mb-4 findpw2-modal-resend"
              onClick={handleClickResend}
            >
              인증코드 다시 보내기
            </div>
            <Button
              variant="primary"
              type="button"
              className="mb-4 ps-5 pe-5"
              onClick={handleClickSubmit}
              disabled={isDisabled()}
            >
              확인
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default FindPw2Modal;
