import { useEffect, useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
axios.defaults.withCredentials = true;

function FindPw3Modal(props) {
  const [validPassword, setValidPassword] = useState(false);
  const [validConfirmPassword, setValidConfirmPassword] = useState(false);
  const passwordRef = useRef(null);

  const handleClose = () => {
    props.setFindPw3Show(false);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleClickSubmit(e);
    }
  };

  function checkPasswordChar(e) {
    const regex =
      /^(?=.*[a-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+~`|}{[\]\\:';"<>,./?-]{10,}$/;
    const isValid = regex.test(e.target.value);
    if (isValid) {
      document.querySelector("#passwordHelpBlock").innerText = "";
      setValidPassword(true);
    } else {
      document.querySelector("#passwordHelpBlock").innerText =
        "비밀번호는 영어, 숫자를 포함해 총 10글자 이상이어야 합니다.";
      setValidPassword(false);
    }
  }

  function checkBothPasswordSame(e) {
    const password = document.getElementsByName("password")[0].value;
    const passwordConfirm = e.target.value;

    if (password === passwordConfirm) {
      document.querySelector("#passwordConfirmHelpBlock").innerText = "";
      setValidConfirmPassword(true);
    } else {
      document.querySelector("#passwordConfirmHelpBlock").innerText =
        "비밀번호가 일치하지 않습니다.";
      setValidConfirmPassword(false);
    }
  }

  const isDisabled = () => {
    return !(validPassword && validConfirmPassword);
  };

  const handleClickSubmit = (e) => {
    e.preventDefault();

    const email = props.findPwEmail;
    const password = document.getElementsByName("password")[0].value;

    if (password.length < 10) {
      document.querySelector("#passwordHelpBlock").innerText =
        "비밀번호는 영어, 숫자를 포함해 총 10글자 이상이어야 합니다.";
      return;
    }

    axios
      .put(
        "http://localhost:8080/member/password",
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
          // alert("비밀번호가 변경 되었습니다.");
          Swal.fire({
            title: "비밀번호가 변경 되었습니다.",
            confirmButtonText: "확인",
          });
          handleClose();
        }
      })
      .catch((error) => {
        // alert("비밀번호 변경 중 오류 발생");
        Swal.fire({
          title:
            "비밀번호 변경 중 오류가 발생 했습니다. 잠시 후 다시 시도해 주세요.",
          confirmButtonText: "확인",
        });
      });

    axios // 인증코드 캐싱 대비 변경
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
      });
  };

  useEffect(() => {
    // 모달 열렸을 때 오토포커스 주기
    if (props.findPw3Show) {
      const passwordInput = document.getElementsByName("password")[0];
      if (passwordInput) {
        passwordRef.current.focus();
      }
    }
  }, [props.findPw3Show]);

  const handlePasswordFocus = (e) => {
    e.target.removeAttribute("readonly");
  };

  return (
    <>
      <Modal
        show={props.findPw3Show}
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
            비밀번호 변경
          </Modal.Title>
        </Modal.Header>

        <Form>
          <Modal.Body
            className="p-5 pb-4 pt-4"
            style={{ backgroundColor: `var(--aim-base-tone)` }}
          >
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
                autoComplete="new-password"
                onChange={checkPasswordChar}
                onFocus={handlePasswordFocus}
                ref={passwordRef}
                style={{
                  color: `var(--aim-text-default)`,
                  backgroundColor: `var(--aim-base-tone)`,
                }}
                readOnly
              />
              <Form.Text id="passwordHelpBlock"></Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="passwordConfirm">
              <Form.Label
                className={`text-${
                  localStorage.getItem("isLightMode") === "true"
                    ? "dark"
                    : "light"
                }`}
              >
                비밀번호 확인
              </Form.Label>
              <Form.Control
                type="password"
                name="passwordConfirm"
                autoComplete="new-password"
                onChange={checkBothPasswordSame}
                onKeyDown={handleEnter}
                style={{
                  color: `var(--aim-text-default)`,
                  backgroundColor: `var(--aim-base-tone)`,
                }}
              />
              <Form.Text id="passwordConfirmHelpBlock"></Form.Text>
            </Form.Group>
          </Modal.Body>

          <Modal.Footer
            style={{ borderTop: "none" }}
            className="d-flex flex-column justify-content-center pt-2 pb-4 ps-5 pe-5"
          >
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

export default FindPw3Modal;
