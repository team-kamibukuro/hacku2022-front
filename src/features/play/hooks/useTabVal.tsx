import useTabSound from "@/hooks/sounds/SoundEffects/useTabSound";
import React, { useState } from "react";

const useTabVal = (): [
  string,
  (e: React.ChangeEvent<HTMLInputElement>) => void
] => {
  const [tabVal, setTabVal] = useState("問題");
  const { play } = useTabSound();

  const handleTabChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTabVal(e.target.value);
    play();
  };

  return [tabVal, handleTabChange];
};

export default useTabVal;
