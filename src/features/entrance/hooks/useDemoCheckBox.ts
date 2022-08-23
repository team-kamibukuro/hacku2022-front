import { selectRoom, switchRoomDemo } from "@/slices/playSlice";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const useDemoCheckBox = () => {
  const dispatch = useDispatch();
  const room = useSelector(selectRoom);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(switchRoomDemo());
  }, []);
  return { room, handleChange };
};

export default useDemoCheckBox;
