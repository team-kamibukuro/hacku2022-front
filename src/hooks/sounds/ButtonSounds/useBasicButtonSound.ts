import React from "react";
import useSound from "use-sound";

const useBasicButtonSound = () => {
  const [playBasicButton] = useSound("/sounds/button01.mp3", {
    volume: 1,
  });

  return [playBasicButton];
};

export default useBasicButtonSound;
