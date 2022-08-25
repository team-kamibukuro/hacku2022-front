import useCheckSound from "@/hooks/sounds/SoundEffects/useCheckSound";
import { selectRoom, switchRoomDemo } from "@/slices/playSlice";
import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const useDiffCheckBox = () => {
  const [isDiff, setIsDiff] = useState(false);
  const [playCheckSound] = useCheckSound();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDiff(!isDiff);
    playCheckSound();
  };

  return { isDiff, handleChange };
};

export default useDiffCheckBox;
