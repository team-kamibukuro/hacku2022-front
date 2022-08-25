import { selectRoom, switchRoomDemo } from "@/slices/playSlice";
import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const useDiffCheckBox = () => {
  const [isDiff, setIsDiff] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDiff(!isDiff);
  };

  return { isDiff, handleChange };
};

export default useDiffCheckBox;
