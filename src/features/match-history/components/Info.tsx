import RankBadge from "@/components/ui-elements/RankBadge";
import { RankingUser } from "@/slices/playSlice/types";
import React from "react";
import useMatchHistoryDetail from "../hooks/useMatchHistoryDetail";
import { GameResult } from "../types";

const Info = () => {
  const { data } = useMatchHistoryDetail();
  return (
    <div className="font-dot">
      <h3 className="text-xl font-medium mb-1">Room name</h3>
      <p className="text-xl font-medium mb-8">{data.roomName}</p>
      <h3 className="text-xl font-medium mb-1">Start</h3>
      <p className="text-xl font-medium mb-8">{data.startTime}</p>

      <h3 className="text-xl font-medium mt-4 mb-2">Ranking</h3>
      <div className="text-left">
        {data.gameResult?.map((result: GameResult, index: number) => {
          return (
            <div key={index} className="flex justify-between w-9/12 mb-2">
              <div className="flex items-center">
                <p className="font-dot text-base mr-2">
                  {result.ranking}位 {result.userName}
                </p>
                <div className="w-6 mt-0.5">
                  <RankBadge rank={result.rankBadge} />
                </div>
              </div>
              <p className="font-dot text-base">time: {result.scoreTime}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Info;
