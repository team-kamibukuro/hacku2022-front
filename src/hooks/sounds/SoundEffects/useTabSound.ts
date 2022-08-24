import React from "react";
import useSound from "use-sound";

const useTabSound = () => {
  const [playTab] = useSound("/sounds/cursor8.mp3", {
    volume: 1,
  });

  return [playTab];
};

export default useTabSound;
