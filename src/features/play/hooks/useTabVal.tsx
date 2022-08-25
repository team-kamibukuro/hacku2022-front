import useTabSound from "@/hooks/sounds/SoundEffects/useTabSound";
import React, { useState } from "react";

const useTabVal = (): [
  string,
  (e: React.ChangeEvent<HTMLInputElement>) => void
] => {
  const [tabVal, setTabVal] = useState("問題");
  const [playTab] = useTabSound();

  const handleTabChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTabVal(e.target.value);
    playTab();
  };

  return [tabVal, handleTabChange];
};

export default useTabVal;
