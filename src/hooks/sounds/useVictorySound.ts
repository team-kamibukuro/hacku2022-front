import React, { useEffect } from "react";
import useSound from "use-sound";

const useVictorySound = () => {
  const [play] = useSound("/sounds/8bit-ME_Victory01.mp3", {
    volume: 0.3,
  });

  useEffect(() => {
    play();
  }, [play]);

  return null;
};

export default useVictorySound;
