import useEntranceBackGroundSound from "@/hooks/sounds/BackGroundSounds/useEntranceBackGroundSound";
import { selectTouchStart, switchTouchStart } from "@/slices/entranceSlice";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const useTouchStart = () => {
  const dispatch = useDispatch();
  const touchStart = useSelector(selectTouchStart);
  const play = useEntranceBackGroundSound();
  const touch = () => {
    dispatch(switchTouchStart());
    play();
  };
  return { touchStart, touch };
};

export default useTouchStart;
