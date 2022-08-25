import React from "react";
import useSound from "use-sound";

const useCheckSound = () => {
  const [playCheck] = useSound("/sounds/radio.mp3", {
    volume: 1,
  });

  return [playCheck];
};

export default useCheckSound;
