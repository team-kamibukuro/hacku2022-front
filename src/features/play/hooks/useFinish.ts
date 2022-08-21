import { selectRanking } from "@/slices/playSlice";
import React from "react";
import { useSelector } from "react-redux";

const useFinish = () => {
  const ranking = useSelector(selectRanking);
  const users = ranking.users;

  return { users };
};

export default useFinish;
