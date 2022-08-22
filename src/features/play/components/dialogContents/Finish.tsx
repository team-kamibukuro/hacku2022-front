import useVictorySound from "@/hooks/sounds/useVictorySound";
import React from "react";
import useFinish from "../../hooks/useFinish";

const Finish = () => {
  const { users } = useFinish();
  useVictorySound();

  return (
    <div>
      <div className="text-center w-80">
        <div className="mb-2">
          <i className="nes-icon trophy is-large"></i>
        </div>
        <div className="text-left">
          {users?.map((user) => {
            return (
              <div key={user.playerId} className="flex justify-between">
                <p className="font-dot text-base">
                  {user.rank}位 {user.name}
                </p>
                <p className="font-dot text-base">time: {user.time}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Finish;
