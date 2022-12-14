import React from "react";
import useSound from "use-sound";

const useDamageSound = () => {
  const [playDamage] = useSound("/sounds/fire-sword.mp3", {
    volume: 0.5,
  });

  return [playDamage];
};

export default useDamageSound;
