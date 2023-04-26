import React from "react";
import SmallProfileName from "./SmallProfileName";

function SmallProfile(props) {
  const { no, nickname, imgUrl, height, modalClose } = props;
  const imageSize = height * 0.8;

  return (
    <div
      id="small-profile"
      style={{
        display: "flex",
        alignItems: "center",
        width: height * 3,
        height: height,
        padding: height / 20,
      }}
    >
      <div
        className="small-profile-image"
        style={{
          backgroundImage: `url(${imgUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: imageSize,
          height: imageSize,
          borderRadius: "50%",
        }}
      ></div>
      <SmallProfileName
        defaultcss={""}
        no={no}
        nickname={nickname}
        height={height}
        modalClose={modalClose}
      />
    </div>
  );
}

export default SmallProfile;
