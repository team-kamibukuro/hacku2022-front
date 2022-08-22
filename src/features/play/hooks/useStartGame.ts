import React, { useState } from "react";
import useInterval from "use-interval";

const useStartGame = () => {
  const [startCountdown, setStartCountdown] = useState(false);

  useInterval(
    () => {
      setStartCountdown(true);
    },
    !startCountdown ? 5000 : null
  );

  return { startCountdown };
};

export default useStartGame;
