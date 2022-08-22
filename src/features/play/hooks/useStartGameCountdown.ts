import usePlayBackGroundSound from "@/hooks/sounds/BackGroundSounds/usePlayBackGroundSound";
import {
  resetDialog,
  selectClock,
  selectCurrentUser,
  selectDialog,
  setStartTime,
  switchAttackIsRunning,
} from "@/slices/playSlice";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const useStartGameCountdown = () => {
  const clockRef = useRef();

  const dispatch = useDispatch();
  const clock = useSelector(selectClock);
  const currentUser = useSelector(selectCurrentUser);
  const play = usePlayBackGroundSound();

  const onComplete = () => {
    dispatch(resetDialog());
    dispatch(setStartTime());
    currentUser.isMaster && dispatch(switchAttackIsRunning());
    clock.start();
    play();
  };
  return { clockRef, onComplete };
};

export default useStartGameCountdown;
