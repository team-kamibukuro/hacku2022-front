import React, { useEffect } from "react";
import useSound from "use-sound";

const useEntranceBackGroundSound = () => {
  const [play] = useSound("/sounds/8bit-act01_title.mp3", {
    loop: true,
    volume: 0.1,
  });

  return play;
};

export default useEntranceBackGroundSound;
