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
  const dialog = useSelector(selectDialog);
  const currentUser = useSelector(selectCurrentUser);

  const start = () => clockRef.current.start();

  useEffect(() => {
    start();
  }, []);

  const onComplete = () => {
    dispatch(resetDialog());
    dispatch(setStartTime());
    currentUser.isMaster && dispatch(switchAttackIsRunning());
    clock.start();
  };
  return { clockRef, onComplete };
};

export default useStartGameCountdown;
