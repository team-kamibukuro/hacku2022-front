import React from "react";
import styles from "./style.module.css";

interface Props {
  result: string;
}
const Terminal: React.FC<Props> = ({ result }) => {
  return (
    <textarea
      className={styles.terminal__textarea}
      spellCheck="false"
      value={result}
    ></textarea>
  );
};

export default Terminal;
