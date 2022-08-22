import React from "react";
import useStartGame from "../../hooks/useStartGame";
import StartGameCountdown from "../StartGameCountdown";
import { RotateLoader as Loader } from "react-spinners";

const StartGame = () => {
  const { startCountdown } = useStartGame();

  return (
    <div>
      {startCountdown ? (
        <div className="text-center px-5 w-80 flex flex-col items-center">
          <p className="font-dot mb-3">ゲーム開始まで残り</p>
          <StartGameCountdown />
        </div>
      ) : (
        <div className="text-center px-5 w-80 flex flex-col items-center">
          <div className="mb-12 mt-6">
            <Loader color={"#ffff"} loading={true} size={10} />
          </div>
          <p className="font-dot mb-3">まもなくゲームが始まります。</p>
        </div>
      )}
    </div>
  );
};

export default StartGame;
