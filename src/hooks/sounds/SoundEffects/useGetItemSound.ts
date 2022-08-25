import React from "react";
import useSound from "use-sound";

const useGetItemSound = () => {
  const [playGetItem] = useSound("/sounds/get-help-item.mp3", {
    volume: 0.5,
  });

  return [playGetItem];
};

export default useGetItemSound;
