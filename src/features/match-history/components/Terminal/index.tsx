import React from "react";
import useMatchHistoryDetail from "../../hooks/useMatchHistoryDetail";
import styles from "./style.module.css";

const Terminal = () => {
  const { data, targetIndex } = useMatchHistoryDetail();
  let result = "";
  if (data.histories[targetIndex].isExecuteTest) {
    if (data.histories[targetIndex].isClearTestCases) {
      result = `${data.histories[targetIndex].testCaseClearTotal}/${data.histories[targetIndex].testCaseTotal} CLEAR!`;
      result += "\nCongratulations!!!\nALL TESTS CLEAR!!";
    } else {
      result = `${data.histories[targetIndex].testCaseClearTotal}/${data.histories[targetIndex].testCaseTotal} CLEAR!`;
    }
  } else {
    if (data.histories[targetIndex].isProgramError) {
      result = data.histories[targetIndex].programError;
    } else {
      result = data.histories[targetIndex].programOutput;
    }
  }

  return (
    <textarea
      className={styles.terminal__textarea}
      spellCheck="false"
      value={result}
    ></textarea>
  );
};

export default Terminal;
