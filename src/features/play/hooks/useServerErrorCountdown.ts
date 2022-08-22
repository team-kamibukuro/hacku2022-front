import { resetDialog, resetHeart, selectCurrentUser } from "@/slices/playSlice";
import { sendWebsocket } from "@/slices/websocketSlice";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Event } from "../types";

const useServerErrorCountdown = () => {
  const clockRef = useRef();
  const currentUser = useSelector(selectCurrentUser);

  const dispatch = useDispatch();

  const onComplete = () => {
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

  return { clockRef, onComplete };
};

export default useServerErrorCountdown;
