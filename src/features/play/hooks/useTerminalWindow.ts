import useBeepSound from "@/hooks/sounds/SoundEffects/useBeepSound";
import useClearSound from "@/hooks/sounds/SoundEffects/useClearSound";
import useTabSound from "@/hooks/sounds/SoundEffects/useTabSound";
import {
  editConsoleResultValue,
  editTestResultValue,
  selectCurrentUser,
  selectLoading,
  selectQuestion,
  selectRoom,
  setFinish,
} from "@/slices/playSlice";
import {
  fetchAsyncRunConsole,
  fetchAsyncRunTestCase,
} from "@/slices/playSlice/api";
import { sendWebsocket } from "@/slices/websocketSlice";
import { TypedDispatch } from "@/store";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import useInterval from "use-interval";
import { Event } from "../types";

const useTerminalWindow = () => {
  const dispatch = useDispatch<TypedDispatch>();
  const [tab, setTab] = useState("コンソール");
  const currentUser = useSelector(selectCurrentUser);
  const room = useSelector(selectRoom);
  const question = useSelector(selectQuestion);
  const loading = useSelector(selectLoading);
  const callTestRef = useRef(false);
  const callConsoleRef = useRef(false);
  const [playTab] = useTabSound();
  const [playBeep] = useBeepSound();
  const [playClear] = useClearSound();

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  const notify = (message: string) => toast.dark(message);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTab(e.target.value);
    playTab();
  };

  const submitConsole = async () => {
    setTab("コンソール");
    callConsoleRef.current = true;
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
        playClear();
        result += text;
      } else {
        const text = `-----------------------\nTEST${
          index + 1
        } FAILED 💩\nERROR:\n${
          testCase.compilerError
        }\n-----------------------\n`;
        dispatch(editTestResultValue(result + text));
        playBeep();
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
      dispatch(setFinish());
      dispatch(
        sendWebsocket({
          event: Event.FINISHED,
          playerId: currentUser.id,
          name: currentUser.name,
        })
      );
      notify(`Congratulations!\nYou Finished 🎉`);
    }
  };

  if (!loading.terminal && currentUser.consoleResult.status === 200) {
    dispatch(editConsoleResultValue(currentUser.consoleResult.result));
  }

  useEffect(() => {
    if (
      !loading.terminal &&
      callConsoleRef.current &&
      currentUser.consoleResult.status === 200
    ) {
      if (currentUser.consoleResult.isCompileError) {
        playBeep();
      } else {
        playClear();
      }
      callConsoleRef.current = false;
    }
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
