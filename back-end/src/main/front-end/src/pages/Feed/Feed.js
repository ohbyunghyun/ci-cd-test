import React from "react";
import "./Feed.css";
import Sortbar from "../../components/Sortbar";
import List from "./List";

function Feed(props) {
  return (
    <div id="feed-body">
      <Sortbar />
      <div id="feed-body-sub">
        <List
          loginShow={props.loginShow}
          setLoginShow={props.setLoginShow}
          signupShow={props.signupShow}
          setSignupShow={props.setSignupShow}
          isLoginModal={props.isLoginModal}
          setIsLoginModal={props.setIsLoginModal}
          showExternalLogin={props.showExternalLogin}
          setShowExternalLogin={props.setShowExternalLogin}
        />
      </div>
    </div>
  );
}

export default Feed;
