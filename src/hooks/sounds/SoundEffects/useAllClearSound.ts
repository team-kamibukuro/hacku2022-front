import React from "react";
import useSound from "use-sound";

const useAllClearSound = () => {
  const [playAllClear] = useSound("/sounds/audiostock_1076022.mp3", {
    volume: 1,
  });

  return [playAllClear];
};

export default useAllClearSound;
