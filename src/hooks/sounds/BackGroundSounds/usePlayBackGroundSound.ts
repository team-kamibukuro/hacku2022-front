import React from "react";
import useSound from "use-sound";

const usePlayBackGroundSound = () => {
  const [play] = useSound("/sounds/8bit-act04_stage01.mp3", {
    loop: true,
    volume: 0.1,
  });

  return play;
};

export default usePlayBackGroundSound;
