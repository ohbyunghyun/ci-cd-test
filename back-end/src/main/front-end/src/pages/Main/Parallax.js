import React, { useEffect, useState } from "react";
import styles from "./Parallax.module.css";

function Parallax() {
  const [position, setPosition] = useState(0);

  function onScroll() {
    setPosition(window.scrollY);
    console.log(window.screenY);
  }

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <p
        style={{
          color: `var(--aim-text-default)`,
          fontSize: `var(--aim-largest-font-size)`,
          letterSpacing: "4px",
          transform: `translateX(${-position}px)`,
        }}
      >
        Welcome to AI World!! Welcome to AI World!!
      </p>

      <p
        style={{
          color: `var(--aim-text-default)`,
          fontSize: `var(--aim-larger-font-size)`,
          transform: `translateX(${position}px)`,
        }}
      >
        Let's Artify Let's Artify Let's Artify Let's Artify Let's Artify
      </p>
      <p
        style={{
          color: `var(--aim-text-default)`,
          fontSize: `var(--aim-nomal-font-size)`,
          opacity: (position - 900) / 50,
        }}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </div>
  );
}

export default Parallax;
