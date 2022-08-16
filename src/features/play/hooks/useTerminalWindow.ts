import { selectCurrentUser } from "@/slices/playSlice";
import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";

const useTerminalWindow = () => {
  const [tab, setTab] = useState("コンソール");
  const [result, setResult] = useState("");
  const currentUser = useSelector(selectCurrentUser);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTab(e.target.value);
    if (tab === "コンソール") {
      setResult(currentUser.consoleResult);
    } else {
      setResult(currentUser.testResults);
    }
  }, []);

  const submitConsole = useCallback(() => {
    setTab("コンソール");
  }, []);

  const submitTest = useCallback(() => {
    setTab("テスト結果");
  }, []);

  return { tab, result, handleChange, submitConsole, submitTest };
};

export default useTerminalWindow;
