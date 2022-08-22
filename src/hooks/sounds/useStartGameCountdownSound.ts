import React, { useEffect } from "react";
import useSound from "use-sound";

const useStartGameCountdownSound = () => {
  const [play] = useSound("/sounds/start-countdown.mp3", {
    volume: 0.3,
  });

  useEffect(() => {
    play();
  }, [play]);

  return null;
};

export default useStartGameCountdownSound;
