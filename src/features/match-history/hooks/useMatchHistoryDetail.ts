import React, { useState } from "react";
import { selectCurrentUser } from "@/slices/playSlice";
import { useSelector } from "react-redux";
import useSWR from "swr";
import { useRouter } from "next/router";
import { Error, MatchHistoryDetailResponse } from "../types";
import { useDispatch } from "react-redux";
import { editMatchHistory, selectTargetIndex } from "@/slices/mypageSlice";
import useTabSound from "@/hooks/sounds/SoundEffects/useTabSound";

const fetcher = (url: string): Promise<any> =>
  fetch(url).then((res) => res.json());

const useMatchHistoryDetail = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const targetIndex = useSelector(selectTargetIndex);
  const router = useRouter();
  const { id } = router.query;
  // const { data, error } = useSWR<MatchHistoryDetailResponse, Error>(
  //   `/match-history/${currentUser.id}/${id}`,
  //   fetcher
  // );

  const [playTab] = useTabSound();

  const data: MatchHistoryDetailResponse = {
    status: 200,
    userId: "id-001",
    userName: "パオパオ",
    startTime: "2022/08/26 14:56:41",
    questionId: "Q_03",
    questionName: "暗号解読",
    questionContext: "問題文-----問題文-----",
    language: "javascript",
    gameResult: [
      {
        userName: "オレンジの神様",
        scoreTime: "08:56",
        rankBadge: 2,
        ranking: 1,
      },
      {
        userName: "サイボーグ人間",
        scoreTime: "10:46",
        rankBadge: 5,
        ranking: 2,
      },
      {
        userName: "はさみんと",
        scoreTime: "20:00",
        rankBadge: 3,
        ranking: 3,
      },
    ],
    histories: [
      {
        historyId: "hd-004",
        debugTime: "2022/08/26 15:07:14",
        code: `inputNum = input()
        for i in range(int(inputNum)+1):
            if i % 2 == 0:
                print(i, end=' ')`,
        isExecuteTest: true,
        isProgramError: false,
        programOutput: "Hello, Hello",
        programError: "",
        isClearTestCases: true,
        testCaseTotal: 5,
        testCaseClearTotal: 5,
      },
      {
        historyId: "hd-006",
        debugTime: "2022/08/26 15:08:53",
        code: `inputNum = input()
        for i in range(int(inputNum)):
            if i % 2 == 0:
                print(i, end=' ')`,
        isExecuteTest: false,
        isProgramError: true,
        programOutput: "",
        programError: "error!!!",
        isClearTestCases: false,
        testCaseTotal: 0,
        testCaseClearTotal: 0,
      },
      {
        historyId: "hd-012",
        debugTime: "2022/08/26 15:16:41",
        code: 'print("Hello, Hello")',
        isExecuteTest: true,
        isProgramError: false,
        programOutput: "Hello, Hello",
        programError: "",
        isClearTestCases: true,
        testCaseTotal: 5,
        testCaseClearTotal: 5,
      },
    ],
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const beforeCode =
      Number(e.target.value) + 1 >= data.histories.length
        ? ""
        : data.histories[Number(e.target.value) + 1].code;
    const matchHistory = {
      targetHistoryIndex: Number(e.target.value),
      currentCode: data.histories[Number(e.target.value)].code,
      beforeCode: beforeCode,
    };
    dispatch(editMatchHistory(matchHistory));
    playTab();
  };

  const formatedItems = data.histories.map((history, index) => {
    const execute = history.isExecuteTest ? "テスト実行" : "コンソール実行";
    return {
      value: index,
      label: "debug time:" + history.debugTime + " 　　" + execute,
    };
  });

  return { data, targetIndex, formatedItems, handleChange };
};

export default useMatchHistoryDetail;
