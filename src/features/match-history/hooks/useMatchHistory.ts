import useTabSound from "@/hooks/sounds/SoundEffects/useTabSound";
import { selectCurrentUser } from "@/slices/playSlice";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useSWR from "swr";
import { Error, MatchHistoryResponse, Room } from "../types";

const fetcher = (url: string): Promise<any> =>
  fetch(url, {
    headers: {
      Authorization: `${localStorage.localJWT}`,
    },
  }).then((res) => res.json());

const useMatchHistory = () => {
  const currentUser = useSelector(selectCurrentUser);
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URI}/match-history/${currentUser.id}`,
    fetcher
  );

  const [playTab] = useTabSound();

  const [value, setValue] = useState(data?.rooms[0].roomId);

  // useEffect(() => {
  //   data && setValue(data?.rooms[0].roomId);
  // }, [data]);

  const historys = data?.rooms.map((room: Room) => {
    let vsPlayersText = "";
    room.players.forEach((player) => (vsPlayersText += player + "vs"));
    return {
      value: room.roomId,
      label: `${room.startTime} ${room.roomName} ${vsPlayersText}`,
    };
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    window.location.href = `/mypage/match-history/${e.target.value}`;

    playTab();
  };

  return {
    historys,
    isLoading: !error && !data,
    isError: error,
    value,
    handleChange,
  };
};

export default useMatchHistory;
