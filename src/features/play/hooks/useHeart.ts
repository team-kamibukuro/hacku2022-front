import useServerdownSound from "@/hooks/sounds/SoundEffects/useServerdownSound";
import { selectCurrentUser, setDialog } from "@/slices/playSlice";
import { sendWebsocket } from "@/slices/websocketSlice";
import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { DialogEvent, Event } from "../types";

const useHeart = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const refFirstRef = useRef(true);
  const firstLoadRef = useRef(true);
  const [playServerdown] = useServerdownSound();

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      if (refFirstRef.current) {
        refFirstRef.current = false;
        return;
      }
    }
    if (firstLoadRef.current) {
      firstLoadRef.current = false;
      return;
    }

    if (currentUser.heart === 0) {
      dispatch(setDialog(DialogEvent.ServerError));
      dispatch(
        sendWebsocket({
          event: Event.SERVER_ERROR,
          status: true,
          playerId: currentUser.id,
          name: currentUser.name,
        })
      );
      playServerdown();
    }
    dispatch(
      sendWebsocket({
        event: Event.UPDATE_HEART,
        playerId: currentUser.id,
        heart: currentUser.heart,
      })
    );
  }, [currentUser.heart]);

  return {};
};

export default useHeart;
