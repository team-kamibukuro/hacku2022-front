import React from "react";
import styles from "./style.module.css";

interface Props {
  value: string;
}
const Terminal: React.FC<Props> = ({ value }) => {
  return (
    <textarea
      className={styles.terminal__textarea}
      spellCheck="false"
      value={value}
      disabled
    ></textarea>
  );
};

export default Terminal;
