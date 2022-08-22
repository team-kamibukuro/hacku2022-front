import { setClock } from "@/slices/playSlice";
import React from "react";
import { useDispatch } from "react-redux";

const useClock = () => {
  const dispatch = useDispatch();
  const clockRef = (node) => {
    if (node !== null) {
      dispatch(setClock(node.api));
    }
  };

  return { clockRef };
};

export default useClock;
