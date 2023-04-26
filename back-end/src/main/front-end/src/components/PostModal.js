import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Form, Spinner } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
axios.defaults.withCredentials = true;

function PostModal(props) {
  const { show, setShow } = props;
  const navigate = useNavigate(null);

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  let [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (currentUser !== null) {
      handleClovaSummary();
    }
  }, [currentUser]);

  const HandleClickGenerate = () => {
    let postText = document.querySelector("#post-text").value.trim();

    if (postText.length === 0) {
      document.querySelector("#postHelpBlock").innerText =
        "내용을 작성해 주세요";
      return;
    }

    if (postText.length > 500) {
      document.querySelector("#postHelpBlock").innerText =
        "500자 이하로 작성해주세요";
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsCompleted(true);

      axios("http://localhost:8080/auth/user")
        .then((response) => {
          if (response.data.status === "success") {
            if (response.data.data.isGenerating === 1) {
              return;
            }
            props.setCurrentUser(response.data.data);
          } else {
            return;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }, 2000);

    setTimeout(() => {
      setIsCompleted(false);
      setIsLoading(false);
      handleClose();
    }, 3000);

    axios("http://localhost:8080/auth/user")
      .then((response) => {
        if (response.data.status === "success") {
          if (response.data.data.isGenerating === 1) {
            Swal.fire({
              title: "AI 그림 생성 중으로 다시 요청할 수 없습니다.",
              confirmButtonText: "확인",
            });
            handleClose();
            return;
          }
          setCurrentUser(response.data.data);
          props.setCurrentUser(response.data.data);
        } else {
          setCurrentUser(null);
          // alert("로그인 후 이용하세요");
          Swal.fire({
            title: "로그인 후 이용하세요.",
            confirmButtonText: "확인",
          });
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
        // alert("로그인 유저 가져오는 중 오류 발생!");
        Swal.fire({
          title:
            "로그인 유저 정보를 가져오는 중 오류가 발생 했습니다. 잠시 후 다시 시도해 주세요.",
          confirmButtonText: "확인",
        });
      });
  };

  const handleClovaSummary = () => {
    // console.log(currentUser);
    const writerNo = currentUser.no;
    const originContent = document.querySelector("#post-text").value;

    axios
      .post(
        "http://localhost:8080/boards",
        {},
        {
          params: {
            writerNo: writerNo,
            originContent: originContent,
          },
        }
      )
      .then((response) => {
        if (response.data.status === "success") {
          // console.log("그림 생성 완료");
        } else {
          // alert("AI 그림 생성 중 이상 발생 했습니다.");
          Swal.fire({
            title:
              "AI 그림 생성 중 이상 발생 했습니다. 잠시 후 다시 시도해 주세요.",
            confirmButtonText: "확인",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        // alert("입력된 문자열 처리 중 오류가 발생 했습니다.");
        Swal.fire({
          title:
            "입력된 문자열 처리 중 오류가 발생 했습니다. 잠시 후 다시 시도해 주세요.",
          confirmButtonText: "확인",
        });
      });
  };

  const handlePostChange = () => {
    document.querySelector("#postHelpBlock").innerText =
      document.querySelector("#post-text").value.length > 500
        ? "500자 이하로 작성해주세요"
        : "";
    document.querySelector("#countChar").innerText =
      document.querySelector("#post-text").value.length;
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        centered
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: `var(--aim-base-alpa)`,
        }}
        contentClassName="bg-dark"
      >
        <Modal.Header
          closeButton
          closeVariant={
            localStorage.getItem("isLightMode") === "true" ? "dark" : "white"
          }
          className="d-flex"
        ></Modal.Header>
        <Modal.Header
          style={{ borderBottom: "none", borderRadius: "0" }}
          className="d-flex justify-content-center p-0"
        >
          <Modal.Title
            className={`text-${
              localStorage.getItem("isLightMode") === "true" ? "dark" : "light"
            }`}
          >
            글쓰기
          </Modal.Title>
        </Modal.Header>

        <Modal.Body
          className="pt-0 pb-0"
          style={{ backgroundColor: `var(--aim-base-tone)` }}
        >
          <Form>
            <Form.Group>
              <Form.Label></Form.Label>
              <Form.Control
                as="textarea"
                id="post-text"
                rows={16}
                placeholder="당신의 이야기를 그림으로 만들어 드려요!"
                onChange={handlePostChange}
                style={{
                  backgroundColor: `var(--aim-base-tone)`,
                  color: `var(--aim-text-default)`,
                  resize: "none",
                }}
              />
              <div className="d-flex justify-content-between">
                <Form.Text id="postHelpBlock" muted></Form.Text>
                <Form.Text id="countChar" muted></Form.Text>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer
          style={{ borderTop: "none" }}
          className="d-flex justify-content-center"
        >
          <Button
            variant="primary"
            type="button"
            onClick={HandleClickGenerate}
            style={{ width: "160px" }}
            disabled={isLoading || isCompleted}
          >
            {isLoading ? (
              <Spinner animation="border" size="sm" />
            ) : isCompleted ? (
              "✓"
            ) : (
              "그림 생성"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PostModal;
