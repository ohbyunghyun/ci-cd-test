import React from "react";
import styles from "./AboutImage.module.css";

function AboutImage() {
  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <div className={styles.contentSection}>
          <div className={styles.title}>
            <h1>About AI</h1>
          </div>
          <div className={styles.content}>
            <h3>
              인간의 지능과 능력을 초월하는 AI의 발전은 우리의 삶과 미래를
              혁신적으로 변화시킬 것입니다.
            </h3>
            <p>
              AI의 발전은 이미 우리의 삶에 큰 영향을 미치고 있습니다. AI는 이제
              막 발전의 초석에 놓인 것이 아닙니다. 머신 러닝 알고리즘과 딥 러닝
              기술의 발전으로 인하여 AI는 예전보다 더욱 정교해지고 있습니다.
              이러한 발전으로 인하여 우리는 더욱 놀라운 기술을 기대할 수
              있습니다.
            </p>
          </div>
        </div>
        <div className={styles.imageSection}>
          <img
            src="https://readitquik.com/wp-content/uploads/2022/02/ai-1.gif"
            width="500px"
          />
        </div>
      </div>
    </div>
  );
}

export default AboutImage;
