import { selectCurrentUser } from "@/slices/playSlice";
import React from "react";
import { useSelector } from "react-redux";
import useSWR from "swr";
import { Error, MyPageResponse } from "../types";

const fetcher = (url: string): Promise<any> =>
  fetch(url).then((res) => res.json());

const useMypage = () => {
  const currentUser = useSelector(selectCurrentUser);
  // const { data, error } = useSWR<MyPageResponse, Error>(
  //   `/mypage/${currentUser.id}`,
  //   fetcher
  // );

  const data: MyPageResponse = {
    status: 200,
    userId: "id-002",
    userName: "パパイヤ",
    rankBadge: 3,
    score: 18000,
  };

  return { data, currentUser };
};

export default useMypage;
