import { selectCurrentUser, selectQuestion } from "@/slices/playSlice";
import {
  fetchAsyncRunConsole,
  fetchAsyncRunTestCase,
} from "@/slices/playSlice/api";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const useTerminalWindow = () => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState("コンソール");
  const currentUser = useSelector(selectCurrentUser);
  const question = useSelector(selectQuestion);
  const refFirstRef = useRef(true);

  const [consoleResult, setConsoleResult] = useState("");
  const [testResult, setTestResult] = useState("");
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTab(e.target.value);
  }, []);

  const submitConsole = async () => {
    setTab("コンソール");
    const request = {
      code: currentUser.code,
      language: currentUser.language,
      questionId: question.id,
    };
    console.log(request);
    dispatch(fetchAsyncRunConsole(request));
    setConsoleResult(currentUser.consoleResult);
  };

  const submitTest = () => {
    setTab("テスト結果");
    const request = {
      code: currentUser.code,
      testId: question.id,
      language: currentUser.language,
    };
    dispatch(fetchAsyncRunTestCase(request));
  };

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      if (refFirstRef.current) {
        refFirstRef.current = false;
        return;
      }
    }

    if (currentUser.testResult.status !== 200) return;
    runTest();
  }, [currentUser.testResult]);

  const runTest = async () => {
    let result = "";
    let finished = false;
    for (const [
      index,
      testCase,
    ] of currentUser.testResult.testCases.entries()) {
      await sleep(1200);
      if (testCase.isClearTestCase) {
        const text = `-----------------------\nTEST${
          index + 1
        } CLEAR 🚀\n-----------------------\n`;
        setTestResult(result + text);
        result += text;
      } else {
        const text = `-----------------------\nTEST${
          index + 1
        } FAILED 💩\nERROR:\n${
          testCase.compilerError
        }\n-----------------------\n`;
        setTestResult(result + text);
        result += text;
      }
      if (currentUser.testResult.testCases.length === index + 1) {
        finished = true;
      }
    }
    if (finished && currentUser.testResult.isClearTestCases) {
      await sleep(800);
      setTestResult(result + "Congratulations!!!\nALL TESTS CLEAR 🎉");
    }
  };

  return {
    tab,
    consoleResult,
    testResult,
    handleChange,
    submitConsole,
    submitTest,
  };
};

export default useTerminalWindow;
