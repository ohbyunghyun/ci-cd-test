import { useEffect, useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
axios.defaults.withCredentials = true;

function FindPwModal(props) {
  const [validEmail, setValidEmail] = useState(false);
  const emailRef = useRef(null);

  const handleClose = () => {
    props.setFindPwShow(false);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleClickSubmit(e);
    }
  };

  const checkEmail = () => {
    const email = document.getElementsByName("email")[0].value;
    document.querySelector("#emailHelpBlock").innerText = "";

    if (!email.includes("@")) {
      setValidEmail(false);
      return;
    } else {
      setValidEmail(true);
    }
  };

  const isDisabled = () => {
    return !validEmail;
  };

  const handleClickSubmit = (e) => {
    e.preventDefault();

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

    axios
      .get("http://localhost:8080/auth/checkemail", {
        params: {
          email: email,
        },
      })
      .then((response) => {
        if (response.data.status === "success") {
          handleClose();
          props.setFindPw2Show(true);
          props.setFindPwEmail(email);
        } else {
          // alert("존재하지 않는 이메일입니다.");
          Swal.fire({
            title: "존재하지 않는 이메일입니다. 이메일 주소를 확인해 주세요.",
            confirmButtonText: "확인",
          });
        }
      })
      .catch((error) => {
        // alert("인증코드 전송 중 오류가 발생 했습니다.");
      });

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
          // console.log(response)
        }
      })
      .catch((error) => {
        // alert("인증코드 전송 중 오류가 발생 했습니다.");
        Swal.fire({
          title:
            "인증코드 전송 중 오류가 발생 했습니다. 잠시 후 다시 시도해 주세요.",
          confirmButtonText: "확인",
        });
      });
  };

  useEffect(() => {
    // 모달 열렸을 때 오토포커스 주기
    if (props.findPwShow) {
      const emailInput = document.getElementsByName("email")[0];
      if (emailInput) {
        emailRef.current.focus();
      }
    }
  }, [props.findPwShow]);

  return (
    <>
      <Modal
        show={props.findPwShow}
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
            비밀번호 찾기
          </Modal.Title>
        </Modal.Header>

        <Form>
          <Modal.Body
            className="p-5 pb-4 pt-4"
            style={{ backgroundColor: `var(--aim-base-tone)` }}
          >
            <Form.Group className="mb-2" controlId="email">
              <Form.Label
                className={`text-${
                  localStorage.getItem("isLightMode") === "true"
                    ? "dark"
                    : "light"
                }`}
              >
                비밀번호 변경을 위한 인증코드를 보내 드립니다.
              </Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="name@naver.com"
                onChange={checkEmail}
                onKeyDown={handleEnter}
                ref={emailRef}
                autoComplete="email"
                style={{
                  color: `var(--aim-text-default)`,
                  backgroundColor: `var(--aim-base-tone)`,
                }}
              />
              <Form.Text id="emailHelpBlock"></Form.Text>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer
            style={{ borderTop: "none" }}
            className="d-flex flex-column justify-content-center pt-2 pb-4 ps-5 pe-5"
          >
            <Button
              variant="primary"
              type="button"
              className="mb-4"
              onClick={handleClickSubmit}
              disabled={isDisabled()}
            >
              인증코드 전송
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default FindPwModal;
