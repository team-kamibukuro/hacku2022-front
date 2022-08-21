import {
  editConsoleResultValue,
  editTestResultValue,
  selectCurrentUser,
  selectLoading,
  selectQuestion,
  selectRoom,
} from "@/slices/playSlice";
import {
  fetchAsyncRunConsole,
  fetchAsyncRunTestCase,
} from "@/slices/playSlice/api";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import useInterval from "use-interval";

const useTerminalWindow = () => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState("コンソール");
  const currentUser = useSelector(selectCurrentUser);
  const room = useSelector(selectRoom);
  const question = useSelector(selectQuestion);
  const loading = useSelector(selectLoading);
  const callTestRef = useRef(false);

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
      roomId: room.id,
      userId: currentUser.id,
    };
    dispatch(fetchAsyncRunConsole(request));
  };

  const submitTest = () => {
    setTab("テスト結果");
    callTestRef.current = true;
    const request = {
      code: currentUser.code,
      testId: question.id,
      language: currentUser.language,
      roomId: room.id,
      userId: currentUser.id,
    };
    dispatch(fetchAsyncRunTestCase(request));
  };

  useInterval(
    async () => {
      tab === "コンソール"
        ? dispatch(editConsoleResultValue("running... |"))
        : dispatch(editTestResultValue("running... |"));
      await sleep(300);
      tab === "コンソール"
        ? dispatch(editConsoleResultValue("running... /"))
        : dispatch(editTestResultValue("running... /"));
      await sleep(300);
      tab === "コンソール"
        ? dispatch(editConsoleResultValue("running... -"))
        : dispatch(editTestResultValue("running... -"));
      await sleep(300);
      tab === "コンソール"
        ? dispatch(editConsoleResultValue("running... \\"))
        : dispatch(editTestResultValue("running... \\"));
      await sleep(300);
    },
    loading.terminal ? 0 : null
  );

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
        dispatch(editTestResultValue(result + text));
        result += text;
      } else {
        const text = `-----------------------\nTEST${
          index + 1
        } FAILED 💩\nERROR:\n${
          testCase.compilerError
        }\n-----------------------\n`;
        dispatch(editTestResultValue(result + text));
        result += text;
      }
      if (currentUser.testResult.testCases.length === index + 1) {
        finished = true;
      }
    }
    if (finished && currentUser.testResult.isClearTestCases) {
      await sleep(800);
      dispatch(
        editTestResultValue(result + "Congratulations!!!\nALL TESTS CLEAR 🎉")
      );
    }
  };

  if (!loading.terminal && currentUser.consoleResult.status === 200) {
    dispatch(editConsoleResultValue(currentUser.consoleResult.result));
  }

  useEffect(() => {
    if (
      !loading.terminal &&
      callTestRef.current &&
      currentUser.testResult.status === 200
    ) {
      runTest();
      callTestRef.current = false;
    }
  }, [loading.terminal]);

  return {
    tab,
    currentUser,
    handleChange,
    submitConsole,
    submitTest,
  };
};

export default useTerminalWindow;
