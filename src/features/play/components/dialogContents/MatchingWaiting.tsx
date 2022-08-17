import React from "react";
import { PacmanLoader } from "react-spinners";

const MatchingWaiting = () => {
  return (
    <div>
      <div className="text-center px-10 w-80 flex flex-col items-center">
        <div className="-ml-20 mb-12 mt-3 text-left">
          <PacmanLoader color={"#ffff"} loading={true} size={20} />
        </div>
        <div className="text-center">
          <p className="font-dot">マッチング中です...</p>
        </div>
      </div>
    </div>
  );
};

export default MatchingWaiting;
