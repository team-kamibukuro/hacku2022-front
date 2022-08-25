import React from "react";
import useSound from "use-sound";

const useServerdownSound = () => {
  const [playServerdown] = useSound("/sounds/warning.mp3", {
    volume: 1,
  });

  return [playServerdown];
};

export default useServerdownSound;
