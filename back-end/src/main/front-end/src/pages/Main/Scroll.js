import React from "react";
// useState : 요청 상태 관리 (1. 요청의 결과, 2. 로딩 상태, 3. 에러)
// useEffect : 컴포넌트가 렌더링되는 시점에 요청을 시작하는 작업
import styles from "./Scroll.module.css";
import ImageText from "./ImageText";
//import axios from "axios";

function Scroll() {
  /*
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);


  axios.get("/boards/main/scroll");

  useEffect(() => {
    const fetcherImgs= async() => {
      // 요청이 시작할 때는 error와 img 초기화
      setError(null);
      setImg(null);
      // loading 상태를 true로 변경
      setLoading(true);
      const response = await axios.get()

    }
  })
  */
  return (
    <div>
      <section id={styles.s1}>
        <h1>AI에 대해 높아지는 관심</h1>
        <a href="#">Let's Artify! / </a>
        <a href={`#${styles.s1}`}> AI에 대해 높아지는 관심 / </a>
        <a href={`#${styles.s2}`}> 주제 선정 이유 / </a>
        <a href={`#${styles.s3}`}> Artify란? / </a>
        <a href={`#${styles.s4}`}> s4 / </a>
        <ImageText />
      </section>
      <section id={styles.s2}>
        <h2>주제 선정 이유</h2>
        <a href="#">Let's Artify! / </a>
        <a href={`#${styles.s1}`}> AI에 대해 높아지는 관심 / </a>
        <a href={`#${styles.s2}`}> 주제 선정 이유 / </a>
        <a href={`#${styles.s3}`}> Artify란? / </a>
        <a href={`#${styles.s4}`}> s4 / </a>
      </section>
      <section id={styles.s3}>
        <h2>Artify란?</h2>
        <a href="#">Let's Artify! / </a>
        <a href={`#${styles.s1}`}> AI에 대해 높아지는 관심 / </a>
        <a href={`#${styles.s2}`}> 주제 선정 이유 / </a>
        <a href={`#${styles.s3}`}> Artify란? / </a>
        <a href={`#${styles.s4}`}> s4 / </a>
        <div className={styles.box}>
          <br />
          <h2 className={styles.h2}>Artify란?</h2>
          <p className={styles.p}>Artify는 AI그림 생성 서비스 입니다.</p>
          <br />
          <h2 className={styles.h2}>주제 선정 이유</h2>
          <p className={styles.p}>
            인스타, 페이스북 같은 sns는 있지만, 이는 작성자가 본인이 표현하고
            싶은 내용을 글로 표현하는 플랫폼 입니다. 그러나 Artify는 본인이
            표현하고 싶은 내용을 입력창에 입력하면, AI가 이를 그림으로
            표현해줍니다. Artify는 그림으로 사용자 간의 자유로운 의사 소통과
            정보공유 등을 통해 사회적 관계를 생성하고 소통을 강화시켜주는 온라인
            플랫폼 입니다.
          </p>
        </div>
      </section>
      <section id={styles.s4}>
        <h2>Food</h2>
        <a href="#">Let's Artify! / </a>
        <a href={`#${styles.s1}`}> AI에 대해 높아지는 관심 / </a>
        <a href={`#${styles.s2}`}> 주제 선정 이유 / </a>
        <a href={`#${styles.s3}`}> Artify란? / </a>
        <a href={`#${styles.s4}`}> s4 / </a>
      </section>
      <section id={styles.s5}>
        <h2>Landscapes</h2>
        <a href={`#${styles.s6}`}>Sci-Fi 이동</a>
      </section>
      <section id={styles.s6}>
        <h2>Sci-Fi</h2>
        <a href="#">Let's Artify! / </a>
      </section>
    </div>
  );
}

export default Scroll;
