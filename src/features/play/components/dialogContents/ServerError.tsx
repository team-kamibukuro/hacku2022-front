import React from "react";
import ServerErrorCountdown from "../ServerErrorCountdown";

const ServerError = () => {
  return (
    <div>
      <div className="text-center flex flex-col items-center">
        <p className="mb-5 text-base">Internal Server Error</p>
        <p className="font-dot mb-3">サーバー回復まで残り</p>
        <ServerErrorCountdown />
      </div>
    </div>
  );
};

export default ServerError;
