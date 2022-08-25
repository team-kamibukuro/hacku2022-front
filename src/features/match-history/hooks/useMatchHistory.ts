import useTabSound from "@/hooks/sounds/SoundEffects/useTabSound";
import { selectCurrentUser } from "@/slices/playSlice";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import useSWR from "swr";
import { Error, MatchHistoryResponse } from "../types";

const fetcher = (url: string): Promise<any> =>
  fetch(url).then((res) => res.json());

const useMatchHistory = () => {
  const currentUser = useSelector(selectCurrentUser);
  // const { data, error } = useSWR<MatchHistoryResponse, Error>(
  //   `/match-history/${currentUser.id}`,
  //   fetcher
  // );

  const [playTab] = useTabSound();

  const data: MatchHistoryResponse = {
    status: 200,
    rooms: [
      {
        roomId: "uuid-002",
        roomName: "パパイヤ",
        startTime: "2022/08/26 14:54",
        playerCount: 3,
        players: ["かぼじい", "淀義橋太郎", "パワーマントヒヒ"],
      },
      {
        roomId: "uuid-003",
        roomName: "パオーンクラブ",
        startTime: "2022/08/26 16:29",
        playerCount: 4,
        players: [
          "サーキュレーター佐藤",
          "サンタ",
          "パワーマントヒヒ",
          "java大好きマン",
        ],
      },
    ],
  };

  const [value, setValue] = useState(data.rooms[0].roomId);
  const historys = data.rooms.map((room) => {
    let vsPlayersText = "";
    room.players.forEach((player) => (vsPlayersText += player + "vs"));
    return {
      value: room.roomId,
      label: `${room.startTime} ${room.roomName} ${vsPlayersText}`,
    };
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    window.location.href = `/mypage/match-history/${value}`;

    playTab();
  };

  return { historys, value, handleChange };
};

export default useMatchHistory;
