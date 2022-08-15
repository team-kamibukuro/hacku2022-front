import React from "react";
import styles from "./style.module.css";
import Script from "next/script";

const StainedGlass = () => {
  return (
    <div className={styles.stainedglass}>
      <div id="controls">
        <input type="hidden" id="themes" value="Orbital"></input>
      </div>
      <svg>
        <g></g>
      </svg>

      <Script src="/scripts/stainedGlass.js" />
    </div>
  );
};

export default StainedGlass;
