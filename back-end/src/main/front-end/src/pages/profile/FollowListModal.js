import React from "react";
import Modal from 'react-modal';
import "./FollowListModal.css";
import SmallProfile from "./SmallProfile";
import FollowBtn from "./FollowBtn";

Modal.setAppElement('#root')

function FollowListModal(props) {
  return (
        <Modal isOpen={props.isOpen} onRequestClose={props.onRequestClose}
        style={{
        overlay: { backgroundColor: `var(--aim-harf-alpa)` },
        content: { width: '380px', height: '500px', margin: 'auto', backgroundColor: `var(--aim-base-tone)`,
        border: 'none', boxShadow: `0 2px 8px var(--aim-fill-alpa)`,
        overflow: 'auto', 
        display: 'flex',
        justifyContent: 'center',
        }}}
        >
        <div>
        {props.follows !== undefined && props.follows.map((follow) => (
          <div key={follow.no} style={{ display: 'flex', alignItems: 'center'}}>
            <SmallProfile key={follow.no + "SamllProfile"}
              modalClose={props.onRequestClose}
              no={follow.no} imgUrl={follow.profilePhoto} nickname={follow.nickname} height='70' />
            <div>
            <FollowBtn key={follow.no + "FollowBtn"}
              followerNo={follow.no} updateCount={props.countUpdate} />
            </div>
          </div>
          ))} 
        </div>
        </Modal>
  );
}

export default FollowListModal;