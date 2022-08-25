import React from "react";
import useSound from "use-sound";

const useGuardSound = () => {
  const [playGuard] = useSound("/sounds/firewall.mp3", {
    volume: 1,
  });

  return [playGuard];
};

export default useGuardSound;
