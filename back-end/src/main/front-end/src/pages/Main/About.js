import React from "react";
import styles from "./About.module.css";

function About() {
  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <div className={styles.contentSection}>
          <div className={styles.title}>
            <h1>About Artify</h1>
          </div>
          <div className={styles.content}>
            <h3>Artify는 AI를 이용한 그림 생성 sns 서비스 입니다.</h3>
            <p>
              Artify는 인공지능 기술을 활용하여 자동으로 그림을 생성하는
              서비스입니다.
              <br /> 이 서비스는 예술가가 아닌 사람들도 쉽게 창의적이고 아름다운
              그림을 만들 수 있게 합니다.
              <br /> 기존 sns처럼 글로 표현하고 이미지를 첨부하는 것이 아닌,
              이미지로 표현하는 서비스입니다.
              <br /> 표현하고 싶었지만 표현할 방법을 몰랐다면, Artify를
              이용해보세요!
            </p>
          </div>
        </div>
        <div className={styles.imageSection}>
          <img
            src="https://img.etimg.com/thumb/msid-80227542,width-1200,height-900,imgsize-820943,resizemode-8/20210112_mit-ai_01.jpg"
            width="500px"
          />
        </div>
      </div>
    </div>
  );
}

export default About;
