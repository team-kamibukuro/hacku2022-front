import React from "react";
import useSound from "use-sound";

const useLinkButtonSound = () => {
  const [playLinkButton] = useSound("/sounds/link.mp3", {
    volume: 1,
  });

  return [playLinkButton];
};

export default useLinkButtonSound;
