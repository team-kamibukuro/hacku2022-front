import React from "react";
import useSound from "use-sound";

const useBeepSound = () => {
  const [playBeep] = useSound("/sounds/beep.mp3", {
    volume: 1,
  });

  return [playBeep];
};

export default useBeepSound;
