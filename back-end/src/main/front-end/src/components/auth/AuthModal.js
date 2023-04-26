import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "./AuthModal.css";
import {
  Pencil,
  Person,
  Gear,
  BoxArrowRight,
  ShieldLock,
  GraphUp,
} from "react-bootstrap-icons";
import PostModal from "../PostModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
axios.defaults.withCredentials = true;

function AuthModal(props) {
  const { show, setShow } = props;
  let { currentUser, setCurrentUser } = props;
  const [postShow, setPostShow] = useState(false);
  const [colorManageIcon, setColorManageIcon] = useState(
    `var(--aim-text-default)`
  );
  const [colorManageText, setColorManageText] = useState(
    `var(--aim-text-default)`
  );
  const [colorStatsIcon, setColorStatsIcon] = useState(
    `var(--aim-text-default)`
  );
  const [colorStatsText, setColorStatsText] = useState(
    `var(--aim-text-default)`
  );
  const [colorPostIcon, setColorPostIcon] = useState(`var(--aim-text-default)`);
  const [colorPostText, setColorPostText] = useState(`var(--aim-text-default)`);
  const [colorProfileIcon, setColorProfileIcon] = useState(
    `var(--aim-text-default)`
  );
  const [colorProfileText, setColorProfileText] = useState(
    `var(--aim-text-default)`
  );
  const [colorSettingsIcon, setColorSettingsIcon] = useState(
    `var(--aim-text-default)`
  );
  const [colorSettingsText, setColorSettingsText] = useState(
    `var(--aim-text-default)`
  );
  const [colorLogoutIcon, setColorLogoutIcon] = useState(
    `var(--aim-text-default)`
  );
  const [colorLogoutText, setColorLogoutText] = useState(
    `var(--aim-text-default)`
  );

  const navigate = useNavigate();

  const handleClose = () => setShow(false);

  const handleClickAdminPage = () => {
    handleClose();
    handleMouseLeaveAdminPage();
    navigate("/admin/member");
  };

  const handleClickStats = () => {
    handleClose();
    handleMouseLeaveStats();
    navigate("/admin/stats");
  };

  const handleClickPostModal = (e) => {
    e.preventDefault();
    setPostShow(true);
    setShow(false);
    handleMouseLeavePost();
  };

  const handleClickProfile = () => {
    axios.get("http://localhost:8080/auth/user").then((response) => {
      navigate("/Profile", {
        state: { no: response.data.data.no },
      });
      handleClose();
    });
    handleMouseLeaveProfile();
  };

  const handleClickSettings = () => {
    navigate("/personalSetting");
    handleMouseLeaveSettings();
    handleClose();
  };

  const handleClickLogout = (e) => {
    e.preventDefault();
    handleClose();
    handleMouseLeaveLogout();

    axios
      .get("http://localhost:8080/auth/logout")
      .then((response) => {
        setCurrentUser(null);
        window.location.href = "http://localhost:3000";
      })
      .catch((error) => {
        // alert("로그아웃 중 오류 발생!");
        Swal.fire({
          title:
            "로그아웃을 시도하는 중 오류가 발생 했습니다. 잠시 후 다시 시도해 주세요.",
          confirmButtonText: "확인",
        });
      });
  };

  const handleMouseEnterAdminPage = () => {
    setColorManageIcon(`var(--aim-text-href)`);
    setColorManageText(`var(--aim-text-href)`);
  };

  const handleMouseLeaveAdminPage = () => {
    setColorManageIcon(`var(--aim-text-default)`);
    setColorManageText(`var(--aim-text-default)`);
  };

  const handleMouseEnterStats = () => {
    setColorStatsIcon(`var(--aim-text-href)`);
    setColorStatsText(`var(--aim-text-href)`);
  };

  const handleMouseLeaveStats = () => {
    setColorStatsIcon(`var(--aim-text-default)`);
    setColorStatsText(`var(--aim-text-default)`);
  };

  const handleMouseEnterPost = () => {
    setColorPostIcon(`var(--aim-text-href)`);
    setColorPostText(`var(--aim-text-href)`);
  };

  const handleMouseLeavePost = () => {
    setColorPostIcon(`var(--aim-text-default)`);
    setColorPostText(`var(--aim-text-default)`);
  };

  const handleMouseEnterProfile = () => {
    setColorProfileIcon(`var(--aim-text-href)`);
    setColorProfileText(`var(--aim-text-href)`);
  };

  const handleMouseLeaveProfile = () => {
    setColorProfileIcon(`var(--aim-text-default)`);
    setColorProfileText(`var(--aim-text-default)`);
  };

  const handleMouseEnterSettings = () => {
    setColorSettingsIcon(`var(--aim-text-href)`);
    setColorSettingsText(`var(--aim-text-href)`);
  };

  const handleMouseLeaveSettings = () => {
    setColorSettingsIcon(`var(--aim-text-default)`);
    setColorSettingsText(`var(--aim-text-default)`);
  };

  const handleMouseEnterLogout = () => {
    setColorLogoutIcon(`var(--aim-text-href)`);
    setColorLogoutText(`var(--aim-text-href)`);
  };

  const handleMouseLeaveLogout = () => {
    setColorLogoutIcon(`var(--aim-text-default)`);
    setColorLogoutText(`var(--aim-text-default)`);
  };

  return (
    <>
      <Modal
        size="sm"
        show={show}
        onHide={handleClose}
        animation={false}
        aria-labelledby="auth-modal-sizes-title-sm"
        backdropClassName="auth-modal-backdrop"
        contentClassName="auth-modal-content"
        dialogClassName={
          currentUser && currentUser.authLevel === 9
            ? "auth-modal-dialog auth-modal-dialog-wide"
            : "auth-modal-dialog"
        }
        id="auth-modal"
      >
        <Modal.Body>
          {currentUser && currentUser.authLevel === 9 && (
            <>
              <div
                className="mb-3 auth-modal-link"
                onClick={handleClickAdminPage}
                onMouseEnter={handleMouseEnterAdminPage}
                onMouseLeave={handleMouseLeaveAdminPage}
              >
                <ShieldLock
                  style={{
                    fontSize: `var(--aim-nomal-font-size)`,
                    position: "relative",
                    bottom: "2px",
                  }}
                  color={colorManageIcon}
                />
                <span className="ms-3 " style={{ color: colorManageText }}>
                  관리 페이지
                </span>
              </div>
              <div
                className="mb-3 auth-modal-link"
                onClick={handleClickStats}
                onMouseEnter={handleMouseEnterStats}
                onMouseLeave={handleMouseLeaveStats}
              >
                <GraphUp
                  style={{
                    fontSize: `var(--aim-nomal-font-size)`,
                    position: "relative",
                    bottom: "2px",
                  }}
                  color={colorStatsIcon}
                />
                <span className="ms-3" style={{ color: colorStatsText }}>
                  통계 페이지
                </span>
              </div>
            </>
          )}
          <div
            className="mb-3 auth-modal-link"
            onClick={
              props.message?.status === "process" ||
              props.currentUser?.isGenerating === 1
                ? undefined
                : handleClickPostModal
            }
            onMouseEnter={handleMouseEnterPost}
            onMouseLeave={handleMouseLeavePost}
            style={{
              cursor: `${
                props.message?.status === "process" ||
                props.currentUser?.isGenerating === 1
                  ? "default"
                  : "pointer"
              }`,
            }}
          >
            <Pencil
              style={{
                fontSize: `var(--aim-nomal-font-size)`,
                position: "relative",
                bottom: "2px",
              }}
              color={
                props.message?.status === "process" ||
                props.currentUser?.isGenerating === 1
                  ? `var(--aim-text-sub)`
                  : colorPostIcon
              }
            />
            <span
              style={{
                color:
                  props.message?.status === "process" ||
                  props.currentUser?.isGenerating === 1
                    ? `var(--aim-text-sub)`
                    : colorPostText,
              }}
              className="ms-3"
            >
              글쓰기
            </span>
          </div>
          <div
            className="mb-3 auth-modal-link"
            onClick={handleClickProfile}
            onMouseEnter={handleMouseEnterProfile}
            onMouseLeave={handleMouseLeaveProfile}
          >
            <Person
              style={{
                fontSize: `var(--aim-nomal-font-size)`,
                position: "relative",
                bottom: "2px",
              }}
              color={colorProfileIcon}
            />
            <span className="ms-3" style={{ color: colorProfileText }}>
              내 프로필
            </span>
          </div>
          <div
            className="mb-3 auth-modal-link"
            onClick={handleClickSettings}
            onMouseEnter={handleMouseEnterSettings}
            onMouseLeave={handleMouseLeaveSettings}
          >
            <Gear
              style={{
                fontSize: `var(--aim-nomal-font-size)`,
                position: "relative",
                bottom: "1px",
              }}
              color={colorSettingsIcon}
            />
            <span className="ms-3" style={{ color: colorSettingsText }}>
              설정
            </span>
          </div>
          <div
            className="mb-0 auth-modal-link"
            onClick={handleClickLogout}
            onMouseEnter={handleMouseEnterLogout}
            onMouseLeave={handleMouseLeaveLogout}
          >
            <BoxArrowRight
              style={{
                fontSize: `var(--aim-nomal-font-size)`,
                position: "relative",
                left: "3px",
                bottom: "3px",
              }}
              color={colorLogoutIcon}
            />
            <span className="ms-3" style={{ color: colorLogoutText }}>
              로그아웃
            </span>
          </div>
        </Modal.Body>
      </Modal>

      <PostModal
        show={postShow}
        setShow={setPostShow}
        currentUser={props.currentUser}
        setCurrentUser={props.setCurrentUser}
      />
    </>
  );
}

export default AuthModal;
