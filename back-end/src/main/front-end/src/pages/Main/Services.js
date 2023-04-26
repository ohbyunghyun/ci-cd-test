import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BsFillGrid3X3GapFill,
  BsChatSquareDotsFill,
  BsFillChatSquareHeartFill,
  BsFillFilePersonFill,
} from "react-icons/bs";

function Services() {
  return (
    <div
      className="container"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "var(--aim-text-default)",
        height: "50vh",
      }}
    >
      <div
        style={{
          margin: "90px auto",
          textAlign: "center",
        }}
        className="services"
      >
        <h1>Our Services</h1>
      </div>
      <div className="row">
        <div className="col-md-3 text-center">
          <div
            className="icon"
            style={{
              fontSize: "40px",
              margin: "20px auto",
              padding: "5px",
              height: "80px",
              width: "80px",
              border: "1px solid white",
              borderRadius: "50%",
            }}
          >
            <BsFillGrid3X3GapFill />
          </div>
          <h3>피드</h3>
          <p>사람들이 작성한 그림들을 볼 수 있습니다.</p>
        </div>

        <div className="col-md-3 text-center">
          <div
            className="icon"
            style={{
              fontSize: "40px",
              margin: "20px auto",
              padding: "5px",
              height: "80px",
              width: "80px",
              border: "1px solid white",
              borderRadius: "50%",
            }}
          >
            <BsChatSquareDotsFill />
          </div>
          <h3>게시글 / 댓글 작성</h3>
          <p>
            내가 표현하고 싶은 그림을 게시하거나
            <br /> 게시글에 댓글을 달 수 있습니다.
          </p>
        </div>

        <div className="col-md-3 text-center">
          <div
            className="icon"
            style={{
              fontSize: "40px",
              margin: "20px auto",
              padding: "5px",
              height: "80px",
              width: "80px",
              border: "1px solid white",
              borderRadius: "50%",
            }}
          >
            <BsFillChatSquareHeartFill />
          </div>
          <h3>좋아요 / 포인트</h3>
          <p>
            마음에 드는 그림을 보셨다면,
            <br /> 좋아요와 포인트를 주세요.
          </p>
        </div>

        <div className="col-md-3 text-center">
          <div
            className="icon"
            style={{
              fontSize: "40px",
              margin: "20px auto",
              padding: "5px",
              height: "80px",
              width: "80px",
              border: "1px solid white",
              borderRadius: "50%",
            }}
          >
            <BsFillFilePersonFill />
          </div>
          <h3>내 프로필</h3>
          <p>
            내가 팔로잉/팔로워 한 회원들과
            <br /> 내 게시글 및 정보를 관리할 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Services;
