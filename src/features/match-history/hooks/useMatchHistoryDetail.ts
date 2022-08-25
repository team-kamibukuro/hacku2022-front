import React, { useState } from "react";
import { selectCurrentUser } from "@/slices/playSlice";
import { useSelector } from "react-redux";
import useSWR from "swr";
import { useRouter } from "next/router";
import { Error, History, MatchHistoryDetailResponse } from "../types";
import { useDispatch } from "react-redux";
import { editMatchHistory, selectTargetIndex } from "@/slices/mypageSlice";
import useTabSound from "@/hooks/sounds/SoundEffects/useTabSound";

const fetcher = (url: string): Promise<any> =>
  fetch(url, {
    headers: {
      Authorization: `${localStorage.localJWT}`,
    },
  }).then((res) => res.json());

const useMatchHistoryDetail = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const targetIndex = useSelector(selectTargetIndex);
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URI}/match-history/${currentUser.id}/${id}`,
    fetcher
  );

  const [playTab] = useTabSound();

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

  const formatedItems = data?.histories.map(
    (history: History, index: number) => {
      const execute = history.isExecuteTest ? "テスト実行" : "コンソール実行";
      return {
        value: index,
        label: "debug time:" + history.debugTime + " 　　" + execute,
      };
    }
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    targetIndex,
    formatedItems,
    handleChange,
  };
};

export default useMatchHistoryDetail;
