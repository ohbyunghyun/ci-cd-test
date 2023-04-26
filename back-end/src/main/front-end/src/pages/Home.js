import React from "react";
//import { createRoot } from "react-dom/client";
import Video from "./Main/Video";
import About from "./Main/About";
import AboutImage from "./Main/AboutImage";
import Services from "./Main/Services";

/*
const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Video />
  </React.StrictMode>
);
*/

function Home(props) {
  return (
    <div>
      <Video
        loginShow={props.loginShow}
        setLoginShow={props.setLoginShow}
        signupShow={props.signupShow}
        setSignupShow={props.setSignupShow}
        isLoginModal={props.isLoginModal}
        setIsLoginModal={props.setIsLoginModal}
        showExternalLogin={props.showExternalLogin}
        setShowExternalLogin={props.setShowExternalLogin}
      />
      <Services />
      <About />
      <AboutImage />
    </div>
  );
}

export default Home;
