import React, { useState, useEffect } from "react";
import FeedModal from "./FeedModal";
import axios from "axios";

function FeedList(props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useState();

  function ShowModal() {
    setModalOpen(!modalOpen);
    if (modalOpen !== true) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }

  const handleLoginShow = () => {
    props.setIsLoginModal(true);
    props.setLoginShow(true);
  };

  useEffect(() => {
    if (props.directModal !== undefined) {
      setModalOpen(true);
    }
  }, [props.directModal]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/auth/user`)
      .then((response) => setUser(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div
        id="feed-list"
        className="feed-list"
        key={props.item.fileName}
        style={{
          color: `var(--aim-text-default)`,
          backgroundImage: `url(${props.item.fileName})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "cover",
        }}
        onClick={() => {
          {
            props.auth && ShowModal();
          }
          {
            !props.auth && handleLoginShow();
          }
        }}
      >
        {modalOpen && (
          <>
            <div
              id="modal-background"
              onClick={() => {
                ShowModal();
              }}
            ></div>
            <div
              id="feed-modal"
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              <div
                id="feed-close"
                onClick={() => {
                  ShowModal();
                }}
                className={`btn-close btn-close-${
                  localStorage.getItem("isLightMode") === "true"
                    ? "dark"
                    : "white"
                }`}
              ></div>
              <FeedModal
                key={props.item}
                data={props.item}
                closeModal={ShowModal}
                user={user}
              />
            </div>
          </>
        )}
        <div id="feed-writer" className="feed-item">
          <div
            id="feed-writer-pic"
            key={props.item.writer.profilePhoto}
            style={{
              backgroundImage: `url(${props.item.writer.profilePhoto})`,
              backgroundSize: "cover",
            }}
          ></div>
          <div id="feed-writer-name">
            <p id="feed-small-font" key={props.item.writer.nickname}>
              {props.item.writer.nickname}
            </p>
          </div>
        </div>
        <div id="feed-like" className="feed-item">
          <div id="feed-like-cnt">
            <p id="feed-small-font-right" key={props.item.likeCnt}>
              {props.item.likeCnt}
            </p>
          </div>
          <div
            id="feed-like-icon"
            style={{
              backgroundImage: `url(/heart.png)`,
              backgroundSize: "cover",
            }}
          ></div>
        </div>
        <div id="feed-content" className="feed-item">
          <p id="feed-small-font" key={props.item.originContent}>
            {props.item.originContent}
          </p>
        </div>
      </div>
    </>
  );
}

export default FeedList;
