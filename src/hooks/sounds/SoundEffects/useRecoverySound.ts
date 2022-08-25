import React from "react";
import useSound from "use-sound";

const useRecoverySound = () => {
  const [playRecovery] = useSound("/sounds/recovery.mp3", {
    volume: 1,
  });

  return [playRecovery];
};

export default useRecoverySound;
