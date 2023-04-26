import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import styles from "./MemberView.module.css";

import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
axios.defaults.withCredentials = true;

function MemberView(props) {
  const { show, setShow, no } = props;
  const handleClose = () => setShow(false);
  const [data, setData] = useState({});
  const [point, setPoint] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/admin/` + no);
        setData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [no, setShow]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/admin/member/` + no
        );
        setPoint(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [no]);

  const handleAccountStateChange = (e) => {
    setData({ ...data, accountState: e.target.value });
    console.log(e.target.value);
    //data.accountState = e.target.value;

    axios
      .put(`http://localhost:8080/admin/member/${no}/accountState`, {
        state: e.target.value,
      })
      .then((response) => {
        console.log("accountState");
        console.log(data.accountState);
        //handleClose();
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        contentClassName={`bg-${
          localStorage.getItem("isLightMode") === "true" ? "light" : "dark"
        }`}
        centered
      >
        <Modal.Header
          closeButton
          closeVariant={
            localStorage.getItem("isLightMode") === "true" ? "dark" : "white"
          }
        >
          <Modal.Title
            className={`text-${
              localStorage.getItem("isLightMode") === "true" ? "dark" : "light"
            }`}
          >
            상세정보
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Container>
              <Row>
                <Col>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <div className="d-flex align-items-center">
                      <Form.Label className={styles.label}>회원번호</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="no"
                        value={data ? data.no : ""}
                        autoFocus
                        readOnly
                        style={{
                          color: `var(--aim-text-default)`,
                          backgroundColor: `var(--aim-base-tone)`,
                        }}
                      />
                    </div>
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <div className="d-flex align-items-center">
                      <Form.Label className={styles.label}>닉네임</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="nickname"
                        value={data ? data.nickname : ""}
                        autoFocus
                        style={{
                          color: `var(--aim-text-default)`,
                          backgroundColor: `var(--aim-base-tone)`,
                        }}
                      />
                    </div>
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <div className="d-flex align-items-center">
                      <Form.Label className={styles.label}>이메일</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="email"
                        value={data ? data.email : ""}
                        autoFocus
                        style={{
                          color: `var(--aim-text-default)`,
                          backgroundColor: `var(--aim-base-tone)`,
                        }}
                      />
                    </div>
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <div className="d-flex align-items-center">
                      <Form.Label className={styles.label}>비밀번호</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="password"
                        value={data ? data.password : ""}
                        autoFocus
                        readOnly
                        style={{
                          color: `var(--aim-text-default)`,
                          backgroundColor: `var(--aim-base-tone)`,
                        }}
                      />
                    </div>
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <div className="d-flex align-items-center">
                      <Form.Label className={styles.label}>가입일</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="createdDate"
                        value={data ? data.createdDate : ""}
                        autoFocus
                        readOnly
                        style={{
                          color: `var(--aim-text-default)`,
                          backgroundColor: `var(--aim-base-tone)`,
                        }}
                      />
                    </div>
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <div className="d-flex align-items-center">
                      <Form.Label className={styles.label}>성별</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="gender"
                        value={
                          data
                            ? data.gender === 1
                              ? "남"
                              : data.gender === 2
                              ? "여"
                              : "미정"
                            : ""
                        }
                        autoFocus
                        readOnly
                        style={{
                          color: `var(--aim-text-default)`,
                          backgroundColor: `var(--aim-base-tone)`,
                        }}
                      />
                    </div>
                  </Form.Group>

                  <img src={data.fileName} className={styles.img} alt="" />

                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <div className="d-flex align-items-center">
                      <Form.Label className={styles.label}>
                        프로필 사진 &nbsp;&nbsp;
                      </Form.Label>
                      <div
                        className={styles.img}
                        style={{
                          backgroundImage: `url(${data.profilePhoto})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center center",
                          width: "150px",
                          height: "150px",
                        }}
                      />
                    </div>
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <div className="d-flex align-items-center">
                      <Form.Label className={styles.label}>기본주소</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="basicAddress"
                        value={data ? data.basicAddress : ""}
                        autoFocus
                        readOnly
                        style={{
                          color: `var(--aim-text-default)`,
                          backgroundColor: `var(--aim-base-tone)`,
                        }}
                      />
                    </div>
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <div className="d-flex align-items-center">
                      <Form.Label className={styles.label}>포인트</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="point"
                        value={data ? point : ""}
                        autoFocus
                        readOnly
                        style={{
                          color: `var(--aim-text-default)`,
                          backgroundColor: `var(--aim-base-tone)`,
                        }}
                      />
                    </div>
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <div className="d-flex align-items-center">
                      <Form.Label className={styles.label}>자기소개</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="information"
                        value={data ? data.information : ""}
                        autoFocus
                        readOnly
                        style={{
                          color: `var(--aim-text-default)`,
                          backgroundColor: `var(--aim-base-tone)`,
                        }}
                      />
                    </div>
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <div className="d-flex align-items-center">
                      <Form.Label className={styles.label}>생년월일</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="birthDate"
                        value={data ? data.birthDate : ""}
                        autoFocus
                        readOnly
                        style={{
                          color: `var(--aim-text-default)`,
                          backgroundColor: `var(--aim-base-tone)`,
                        }}
                      />
                    </div>
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <div className="d-flex align-items-center">
                      <Form.Label className={styles.label}>전화번호</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="tel"
                        value={data ? data.tel : ""}
                        autoFocus
                        readOnly
                        style={{
                          color: `var(--aim-text-default)`,
                          backgroundColor: `var(--aim-base-tone)`,
                        }}
                      />
                    </div>
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <div className="d-flex align-items-center">
                      <Form.Label className={styles.label}>
                        비밀번호
                        <br />
                        변경일시
                      </Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="passwordDate"
                        value={data ? data.passwordDate : ""}
                        autoFocus
                        readOnly
                        style={{
                          color: `var(--aim-text-default)`,
                          backgroundColor: `var(--aim-base-tone)`,
                        }}
                      />
                    </div>
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlSelect1"
                  >
                    <div className="d-flex align-items-center">
                      <Form.Label className={styles.label}>계정상태</Form.Label>
                      <Form.Select
                        aria-label="계정상태"
                        className={styles.option}
                        value={data.accountState}
                        onChange={handleAccountStateChange}
                        style={{
                          color: `var(--aim-text-default)`,
                          backgroundColor: `var(--aim-base-tone)`,
                        }}
                      >
                        <option
                          className={styles.option}
                          value="0"
                          style={{
                            color: `var(--aim-text-default)`,
                          }}
                        >
                          이메일 인증
                        </option>
                        <option
                          className={styles.option}
                          value="1"
                          style={{
                            color: `var(--aim-text-default)`,
                          }}
                        >
                          이메일 미인증
                        </option>
                        <option
                          className={styles.option}
                          value="2"
                          style={{
                            color: `var(--aim-text-default)`,
                          }}
                        >
                          휴면계정
                        </option>
                        <option
                          className={styles.option}
                          value="3"
                          style={{
                            color: `var(--aim-text-default)`,
                          }}
                        >
                          탈퇴
                        </option>
                        <option
                          className={styles.option}
                          value="4"
                          style={{
                            color: `var(--aim-text-default)`,
                          }}
                        >
                          정지
                        </option>
                      </Form.Select>
                    </div>
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <div className="d-flex align-items-center">
                      <Form.Label className={styles.label}>권한레벨</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="authLevel"
                        value={
                          data ? (data.authLevel === 9 ? "관리자" : "일반") : ""
                        }
                        autoFocus
                        style={{
                          color: `var(--aim-text-default)`,
                          backgroundColor: `var(--aim-base-tone)`,
                        }}
                      />
                    </div>
                  </Form.Group>
                </Col>
              </Row>
            </Container>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default MemberView;
