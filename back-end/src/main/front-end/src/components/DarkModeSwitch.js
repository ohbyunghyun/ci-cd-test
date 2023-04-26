import React, { useEffect, useState } from "react";
import "./DarkModeSwitch.css";

function DarkModeSwitch(props) {
  const root = document.querySelector(":root");

  useEffect(() => {
    if (props.isLightMode) {
      root.style.setProperty("--aim-base-tone", `#F8F9FA`);
      root.style.setProperty("--aim-base-tone-up", `#E9ECEF`);
      root.style.setProperty("--aim-base-tone-down", `#FFFFFF`);
      root.style.setProperty("--aim-base-tone-sub", `#594A4A`);

      root.style.setProperty("--aim-border", `#595959`);

      root.style.setProperty("--aim-text-default", `#212529`);
      root.style.setProperty("--aim-text-sub", `#7F7F7F`);

      root.style.setProperty("--aim-git-icon-color", `invert(100%)`);
    } else {
      root.style.setProperty("--aim-base-tone", `#212529`);
      root.style.setProperty("--aim-base-tone-up", `#323539`);
      root.style.setProperty("--aim-base-tone-down", `#000000`);
      root.style.setProperty("--aim-base-tone-sub", `#737373`);

      root.style.setProperty("--aim-border", `#A6A6A6`);

      root.style.setProperty("--aim-text-default", `#EDEEEF`);
      root.style.setProperty("--aim-text-sub", `#7F7F7F`);

      root.style.setProperty("--aim-git-icon-color", `none`);
    }
  }, [props.isLightMode]);

  const handleChange = () => {
    const newMode = !props.isLightMode;
    props.setIsLightMode(newMode);
    localStorage.setItem("isLightMode", JSON.stringify(newMode));
  };

  return (
    <>
      <div className="d-flex align-items-center ms-2 me-2">
        <label className="switch">
          <input
            type="checkbox"
            checked={props.isLightMode}
            onChange={handleChange}
          />
          <span className="slider"></span>
        </label>
      </div>
    </>
  );
}

export default DarkModeSwitch;
