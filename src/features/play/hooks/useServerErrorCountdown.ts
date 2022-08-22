import { resetDialog, resetHeart, selectCurrentUser } from "@/slices/playSlice";
import { sendWebsocket } from "@/slices/websocketSlice";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Event } from "../types";

const useServerErrorCountdown = () => {
  const clockRef = useRef();
  const currentUser = useSelector(selectCurrentUser);

  const dispatch = useDispatch();

  const [data, setData] = useState({ date: Date.now(), delay: 20000 });
  const wantedDelay = 20000;
  const getLocalStorageValue = (s) => localStorage.getItem(s);

  useEffect(() => {
    const savedDate = getLocalStorageValue("end_date_serverdown");
    if (savedDate != null && !isNaN(savedDate)) {
      const currentTime = Date.now();
      const delta = parseInt(savedDate, 10) - currentTime;

      if (delta > wantedDelay) {
        if (
          getLocalStorageValue("end_date_serverdown") !== null &&
          localStorage.getItem("end_date_serverdown").length > 0
        )
          localStorage.removeItem("end_date_serverdown");
      } else {
        setData({ date: currentTime, delay: delta });
      }
    }
  }, []);

  const onComplete = () => {
    if (localStorage.getItem("end_date_serverdown") != null) {
      localStorage.removeItem("end_date_serverdown");
    }

    dispatch(resetDialog());
    dispatch(resetHeart());
    dispatch(
      sendWebsocket({
        event: Event.SERVER_ERROR,
        status: false,
        playerId: currentUser.id,
        name: currentUser.name,
      })
    );
  };

  return { data, clockRef, onComplete };
};

export default useServerErrorCountdown;
