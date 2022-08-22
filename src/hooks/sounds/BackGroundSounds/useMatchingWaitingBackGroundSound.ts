import React, { useEffect } from "react";
import useSound from "use-sound";

const useMatchingWaitingBackGroundSound = () => {
  const [play] = useSound("/sounds/8bit-act02_select.mp3", {
    loop: true,
    volume: 0.1,
  });

  useEffect(() => {
    play();
  }, [play]);

  return null;
};

export default useMatchingWaitingBackGroundSound;
