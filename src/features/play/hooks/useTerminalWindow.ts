import { selectCurrentUser, selectQuestion } from "@/slices/playSlice";
import {
  fetchAsyncRunConsole,
  fetchAsyncRunTestCase,
} from "@/slices/playSlice/api";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const useTerminalWindow = () => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState("コンソール");
  const currentUser = useSelector(selectCurrentUser);
  const question = useSelector(selectQuestion);

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
    await dispatch(fetchAsyncRunConsole(request));
  };

  const submitTest = async () => {
    setTab("テスト結果");
    const request = {
      code: currentUser.code,
      testId: question.id,
      language: currentUser.language,
    };
    await dispatch(fetchAsyncRunTestCase(request));
  };

  return { tab, currentUser, handleChange, submitConsole, submitTest };
};

export default useTerminalWindow;
