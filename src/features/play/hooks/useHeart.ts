import { selectCurrentUser } from "@/slices/playSlice";
import { sendWebsocket } from "@/slices/websocketSlice";
import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Event } from "../types";

const useHeart = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const refFirstRef = useRef(true);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      if (refFirstRef.current) {
        refFirstRef.current = false;
        return;
      }
    }

    if (currentUser.heart === 3) return;
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
