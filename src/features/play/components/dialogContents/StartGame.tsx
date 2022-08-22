import React from "react";
import StartGameCountdown from "../StartGameCountdown";

const StartGame = () => {
  return (
    <div>
      <div className="text-center px-5 w-80 flex flex-col items-center">
        {/* <p className="font-dot mb-3">まもなくゲームが始まります。</p> */}
        <p className="font-dot mb-3">ゲーム開始まで残り</p>
        <StartGameCountdown />
      </div>
    </div>
  );
};

export default StartGame;
