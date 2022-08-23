import { editRoom, editRoomName, selectRoom } from "@/slices/playSlice";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const useRoomHandleChange = () => {
  const dispatch = useDispatch();
  const room = useSelector(selectRoom);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(editRoomName({ name: value }));
  }, []);

  return { room, handleChange };
};

export default useRoomHandleChange;
