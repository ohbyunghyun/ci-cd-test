import React, { useEffect, useState } from "react";
import styles from "./ImageText.module.css";
import axios from "axios";

function ImageText() {
  const [no, setNo] = useState([]);
  const [image, setImage] = useState([]);
  const [content, setContent] = useState([]);

  /*
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:8080/boards");
        setImage(response.data);
        setContent(response.data.contents);
        // console.log(image);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const randomImage = image[Math.floor(Math.random() * image.length)];
*/
  return (
    <div className={styles.frame}>
      <div className={styles.wrapper}>
        <div className={styles.box}>
          <img
            src="https://mblogthumb-phinf.pstatic.net/MjAyMjA5MDRfMjMy/MDAxNjYyMjgxMTI1Nzky.LzJDGgJFLnUortDCJ4SGonPG1IBd_W4BxhQvCOF2lUsg.kzFt0r_bacVppscz5ppHF3H1q5fW9imeLEtCx1Fige8g.JPEG.jrkimceo/Th%C3%A9%C3%A2tre_D%E2%80%99op%C3%A9ra_Spatial.jpg?type=w800"
            className={styles.img}
            alt=""
          />

          <h2 className={styles.h2}>
            [지구촌 더뉴스] 미국 콜로라도 미술대회 1위 그림 ‘스페이스 오페라
            극장’
          </h2>
          <p className={styles.p}>
            오페라 공연이 한창인 무대 전경을 섬세하고 신비롭게 묘사한 이 그림!
            지난달 미국 콜로라도 주립 박람회 미술대회에서 디지털 아트 부문 1위를
            차지한 '스페이스 오페라 극장'입니다. 그런데 최근 이 작품이 뜨거운
            논란거리로 떠올랐는데요...
            <br />
            <br />
            [KBS][지구촌 더뉴스] 미국 콜로라도 미술대회 1위 그림 ‘스페이스
            오페라 극장’
            <br />
            <a href="https://n.news.naver.com/mnews/article/056/0011334810?sid=104">
              👉 기사 자세히 보기
            </a>
          </p>
        </div>
      </div>

      <div className={styles.wrapper}>
        <div className={styles.box}>
          <img
            src="https://imgnews.pstatic.net/image/469/2022/12/18/0000713404_001_20221218070016395.jpg?type=w647"
            className={styles.img}
            alt=""
          />

          <h2 className={styles.h2}>
            공개 2주 만에 SNS서 최고 스타 된 ‘챗GPT’ AI, "놀랍다" 후기도
            봇물...어떻길래
          </h2>
          <p className={styles.p}>
            지난 1일, 세계 최대 인공지능(AI) 연구재단인 미국의 오픈AI는 대화형
            AI 서비스(챗봇)의 일종인 '챗GPT'를 공개했다. 누구나 무료로 AI와
            "대화할 수 있는" 이 사이트는 베타 테스트로 대중에 개방한 지 불과
            2주가 지났지만 현재 사회관계망서비스(SNS)의 최고 스타 중 하나다...
            <br />
            <br />
            [한국일보]공개 2주 만에 SNS서 최고 스타 된 ‘챗GPT’ AI, "놀랍다"
            후기도 봇물...어떻길래
            <br />
            <a href="https://n.news.naver.com/mnews/article/008/0004876526?sid=101">
              👉 기사 자세히 보기
            </a>
          </p>
        </div>
      </div>

      <div className={styles.wrapper}>
        <div className={styles.box}>
          <img
            src="https://imgnews.pstatic.net/image/057/2023/03/12/0001728082_001_20230312104101153.png?type=w647"
            className={styles.img}
            alt=""
          />

          <h2 className={styles.h2}>
            AI가 그린 '진주 귀걸이 소녀'...예술로 봐야 할까?
          </h2>
          <p className={styles.p}>
            최근 네덜란드 헤이그의 마우리츠하위스 미술관 공모에 참여한 한 미술
            작품이 AI가 그린 것으로 알려지면서, 이 작품을 예술로 봐야 할지에
            대한 논란이 일고 있습니다. 해당 작품은 요하네스 페르메이르가 1665년
            완성한 걸작 '진주 귀걸이 소녀'를 AI가 재해석한 그림입니다...
            <br />
            <br />
            [MBN]AI가 그린 '진주 귀걸이 소녀'...예술로 봐야 할까?
            <br />
            <a href="https://n.news.naver.com/mnews/article/057/0001728082?sid=104">
              👉 기사 자세히 보기
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ImageText;
