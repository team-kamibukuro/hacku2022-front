import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { editRoom, editRoomMaxPlayer, selectRoom } from "@/slices/playSlice";
import { useSelector } from "react-redux";

const useMaxPlayer = () => {
  const dispatch = useDispatch();

  const maxPlayers = [2, 3, 4];
  const items = maxPlayers.map((maxPlayer, index) => {
    return {
      value: index,
      label: String(maxPlayer) + "players",
    };
  });

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = Number(e.target.value);
      dispatch(editRoomMaxPlayer({ maxPlayer: maxPlayers[value] }));
    },
    []
  );

  return { items, handleChange };
};

export default useMaxPlayer;
