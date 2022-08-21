import { resetDialog, resetHeart, selectCurrentUser } from "@/slices/playSlice";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const useServerErrorCountdown = () => {
  const clockRef = useRef();
  const refFirstRef = useRef(true);

  const dispatch = useDispatch();

  const onComplete = () => {
    dispatch(resetDialog());
    dispatch(resetHeart());
  };

  return { clockRef, onComplete };
};

export default useServerErrorCountdown;
