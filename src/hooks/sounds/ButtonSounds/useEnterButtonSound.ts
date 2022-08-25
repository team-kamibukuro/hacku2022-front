import React from "react";
import useSound from "use-sound";

const useEnterButtonSound = () => {
  const [playEnterButton] = useSound("/sounds/enter.mp3", {
    volume: 1,
  });

  return [playEnterButton];
};

export default useEnterButtonSound;
