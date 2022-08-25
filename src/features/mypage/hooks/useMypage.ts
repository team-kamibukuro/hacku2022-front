import { selectCurrentUser } from "@/slices/playSlice";
import React from "react";
import { useSelector } from "react-redux";
import useSWR from "swr";
import { Error, MyPageResponse } from "../types";

const fetcher = (url: string): Promise<any> =>
  fetch(url, {
    headers: {
      Authorization: `${localStorage.localJWT}`,
    },
  }).then((res) => res.json());

const useMypage = () => {
  const currentUser = useSelector(selectCurrentUser);
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URI}/mypage/${currentUser.id}`,
    fetcher
  );

  return { data, isLoading: !error && !data, isError: error, currentUser };
};

export default useMypage;
