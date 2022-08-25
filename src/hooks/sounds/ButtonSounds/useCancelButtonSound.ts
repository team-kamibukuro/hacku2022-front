import React from "react";
import useSound from "use-sound";

const useCancelButtonSound = () => {
  const [CancelButton] = useSound("/sounds/cancel.mp3", {
    volume: 1,
  });

  return [CancelButton];
};

export default useCancelButtonSound;
