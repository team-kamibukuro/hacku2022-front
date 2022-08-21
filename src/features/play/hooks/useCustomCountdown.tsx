import { selectCurrentUser, setFinish } from "@/slices/playSlice";
import { sendWebsocket } from "@/slices/websocketSlice";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Event } from "../types";

const useCustomCountdown = (time) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const renderer = ({ formatted, completed }) => {
    if (completed) {
      return <span className="font-dot">00:00:00</span>;
    } else {
      return (
        <span className="font-dot">
          {formatted.hours}:{formatted.minutes}:{formatted.seconds}
        </span>
      );
    }
  };

  const [data, setData] = useState({ date: Date.now(), delay: time });

  const wantedDelay = 60000;

  const getLocalStorageValue = (s: string) => localStorage.getItem(s);

  useEffect(() => {
    const savedDate: any = getLocalStorageValue("end_date");
    if (savedDate != null && !isNaN(savedDate)) {
      const currentTime = Date.now();
      const delta = parseInt(savedDate, 10) - currentTime;

      if (delta > wantedDelay) {
        if (
          getLocalStorageValue("end_date") !== null &&
          getLocalStorageValue("end_date")!.length > 0
        )
          localStorage.removeItem("end_date");
      } else {
        setData({ date: currentTime, delay: delta });
      }
    }
  }, []);

  const onComplete = () => {
    if (localStorage.getItem("end_date") != null)
      localStorage.removeItem("end_date");

    dispatch(
      sendWebsocket({
        event: Event.FINISHED,
        playerId: currentUser.id,
        name: currentUser.name,
      })
    );
  };

  return { renderer, data, onComplete };
};

export default useCustomCountdown;
