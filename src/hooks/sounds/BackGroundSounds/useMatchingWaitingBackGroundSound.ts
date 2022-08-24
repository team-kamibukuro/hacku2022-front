import React, { useEffect } from "react";
import useSound from "use-sound";

const useMatchingWaitingBackGroundSound = () => {
  const [play, { stop }] = useSound("/sounds/mokkin.mp3", {
    loop: true,
    volume: 0.8,
  });

  useEffect(() => {
    play();

    return () => {
      stop();
    };
  }, [play]);

  return {};
};

export default useMatchingWaitingBackGroundSound;
