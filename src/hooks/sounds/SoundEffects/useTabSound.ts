import React from "react";
import useSound from "use-sound";

const useTabSound = () => {
  const [play] = useSound("/sounds/cursor8.mp3", {
    volume: 1,
  });

  return { play };
};

export default useTabSound;
