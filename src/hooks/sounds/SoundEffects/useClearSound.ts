import React from "react";
import useSound from "use-sound";

const useClearSound = () => {
  const [playClear] = useSound("/sounds/clear.mp3", {
    volume: 1,
  });

  return [playClear];
};

export default useClearSound;
