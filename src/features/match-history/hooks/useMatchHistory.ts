import useTabSound from "@/hooks/sounds/SoundEffects/useTabSound";
import { selectCurrentUser } from "@/slices/playSlice";
import React, { useEffect, useRef, useState } from "react";
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
  const isEmpty = useRef(false);

  const [playTab] = useTabSound();

  const [value, setValue] = useState("");

  useEffect(() => {
    if (data && data.rooms.length) {
      setValue(data.rooms[0].roomId);
    } else if (data && !data.rooms.length) {
      isEmpty.current = true;
    }
  }, [data]);

  const historys = data?.rooms.map((room: Room) => {
    return {
      value: room.roomId,
      roomName: room.roomName,
      players: room.players,
      datetime: room.startTime,
    };
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    window.location.href = `/mypage/match-history/${e.target.value}`;
    playTab();
  };

  const onClick = () => {
    if (value === data?.rooms[0].roomId) {
      window.location.href = `/mypage/match-history/${value}`;
      playTab();
    }
  };

  return {
    historys,
    isLoading: !error && !data,
    isError: error,
    isEmpty: isEmpty.current,
    value,
    handleChange,
    onClick,
  };
};

export default useMatchHistory;
