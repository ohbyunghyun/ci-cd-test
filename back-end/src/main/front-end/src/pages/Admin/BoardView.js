import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import styles from "./BoardView.module.css";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";

function BoardView(props) {
  const { show, setShow, no } = props;
  const handleClose = () => setShow(false);
  const [data, setData] = useState({});
  const [tag, setTag] = useState({});
  const [report, setReport] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/admin/board/` + no
        );
        setData(response.data);
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
          `http://localhost:8080/admin/board/tag/` + no
        );
        const tag = response.data[0].tag;
        setData((prevData) => ({
          ...prevData,
          tag: response.data[0].tag,
        }));
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [no]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/admin/board/report/` + no
        );
        setReport(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [no]);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        contentClassName={`bg-${
          localStorage.getItem("isLightMode") === "true" ? "light" : "dark"
        }`}
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
            상세보기
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
                    <Form.Label className={styles.Label}>
                      게시글 번호
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="boardNo"
                      value={data.boardNo}
                      autoFocus
                      readOnly
                      style={{
                        color: `var(--aim-text-default)`,
                        backgroundColor: `var(--aim-base-tone)`,
                      }}
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className={styles.Label}>닉네임</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="nickname"
                      defaultValue={
                        data && data.writer ? data.writer.nickname : ""
                      }
                      autoFocus
                      value={data && data.writer ? data.writer.nickname : ""}
                      onChange={(e) =>
                        setData({
                          ...data,
                          writer: { ...data.writer, nickname: e.target.value },
                        })
                      }
                      style={{
                        color: `var(--aim-text-default)`,
                        backgroundColor: `var(--aim-base-tone)`,
                      }}
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className={styles.Label}></Form.Label>
                    <img src={data.fileName} className={styles.img} alt="" />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className={styles.Label}>원본 내용</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="originContent"
                      value={data.originContent}
                      onChange={(e) =>
                        setData({ ...data, originContent: e.target.value })
                      }
                      style={{
                        color: `var(--aim-text-default)`,
                        backgroundColor: `var(--aim-base-tone)`,
                      }}
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className={styles.Label}>요약 내용</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="summaryContent"
                      value={data.summaryContent}
                      onChange={(e) =>
                        setData({ ...data, summaryContent: e.target.value })
                      }
                      style={{
                        color: `var(--aim-text-default)`,
                        backgroundColor: `var(--aim-base-tone)`,
                      }}
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className={styles.Label}>번역 내용</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="transContent"
                      value={data.transContent}
                      onChange={(e) =>
                        setData({ ...data, transContent: e.target.value })
                      }
                      style={{
                        color: `var(--aim-text-default)`,
                        backgroundColor: `var(--aim-base-tone)`,
                      }}
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <div className="d-flex align-items-center">
                      <Form.Label className={styles.short}>태그</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="tag"
                        value={data.tag}
                        onChange={(e) =>
                          setData({ ...data, tag: e.target.value })
                        }
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
                      <Form.Label className={styles.shortTitle}>
                        좋아요
                      </Form.Label>
                      <Form.Control
                        className={styles.shortContext}
                        type="text"
                        placeholder="likeCnt"
                        value={data.likeCnt}
                        onChange={(e) =>
                          setData({ ...data, likeCnt: e.target.value })
                        }
                        style={{
                          color: `var(--aim-text-default)`,
                          backgroundColor: `var(--aim-base-tone)`,
                        }}
                      />
                      <Form.Label className={styles.shortTitle2}>
                        조회수
                      </Form.Label>
                      <Form.Control
                        className={styles.shortContext}
                        type="text"
                        placeholder="viewCnt"
                        value={data.viewCnt}
                        onChange={(e) =>
                          setData({ ...data, viewCnt: e.target.value })
                        }
                        style={{
                          color: `var(--aim-text-default)`,
                          backgroundColor: `var(--aim-base-tone)`,
                        }}
                      />
                      <Form.Label className={styles.longTitle}>
                        게시글 공개
                      </Form.Label>
                      <Form.Check
                        className={styles.longContext}
                        type="checkbox"
                        id="boardPublic"
                        defaultChecked={data.boardPublic}
                      />

                      <Form.Label className={styles.longTitle}>
                        댓글 공개
                      </Form.Label>
                      <Form.Check
                        className={styles.longContext}
                        type="checkbox"
                        id="replyPublic"
                        defaultChecked={data.replyPublic}
                      />
                    </div>
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <div className="d-flex align-items-center">
                      <Form.Label className={styles.short}>작성일</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="writeDt"
                        defaultValue={data.writeDt}
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
                      <Form.Label className={styles.short}>수정일</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="updateDt"
                        defaultValue={data.updateDt}
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
                      <Form.Label className={styles.long}>신고 횟수</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="reportCnt"
                        report
                        value={report}
                        autoFocus
                        readOnly
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

export default BoardView;
