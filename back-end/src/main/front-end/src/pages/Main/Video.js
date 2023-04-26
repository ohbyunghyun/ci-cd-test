import React from "react";
import styles from "./Video.module.css";

function Video(props) {
  const handleShowLogin = (e) => {
    e.preventDefault();
    props.setLoginShow(true);
  };

  return (
    <div className={styles.frame}>
      <video className={styles.video} autoPlay muted loop>
        <source src="smoothvideo.mp4" type="video/mp4" />
      </video>
      <div className={styles.container}>
        <h1 className={styles.h1}>
          <span className={styles.span}>Artify</span>
        </h1>
        <p className={styles.p}>
          표현하고 싶었지만 표현할 방법을 몰랐다면, AI 그림 생성 서비스 Artify를
          이용해보세요!
        </p>
      </div>
    </div>
  );
}

export default Video;
