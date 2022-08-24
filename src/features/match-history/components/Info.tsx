import { RankingUser } from "@/slices/playSlice/types";
import React from "react";

const Info = () => {
  const users = [
    {
      playerId: "123",
      name: "太郎",
      time: "12:34",
      rank: 1,
    },
    {
      playerId: "3",
      name: "太郎",
      time: "12:34",
      rank: 2,
    },
    {
      playerId: "13",
      name: "太郎",
      time: "12:34",
      rank: 3,
    },
    {
      playerId: "12",
      name: "太郎",
      time: "12:34",
      rank: 4,
    },
  ];
  return (
    <div>
      <p>日時: 8/24 13:07</p>

      <div className="text-left">
        {users?.map((user: RankingUser) => {
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
  );
};

export default Info;
