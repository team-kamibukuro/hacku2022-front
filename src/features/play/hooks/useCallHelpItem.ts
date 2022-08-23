import {
  selectAttackIsRunning,
  selectCurrentUser,
  selectPlayers,
  switchFirewall,
} from "@/slices/playSlice";
import { sendWebsocket } from "@/slices/websocketSlice";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import useInterval from "use-interval";
import { Event } from "../types";

const useCallHelpItem = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const players = useSelector(selectPlayers);
  const attackIsRunning = useSelector(selectAttackIsRunning);
  const users = [currentUser, ...players];

  useInterval(
    () => {
      console.log("random help item");
      const n = Math.random();

      if (n < 0.4) {
        randomHelpItem();
      }
    },
    attackIsRunning ? 20000 : null
  );

  const randomHelpItem = () => {
    const userIndex = Math.floor(Math.random() * users.length);
    if (users[userIndex].id === currentUser.id) {
      if (currentUser.finish.finished) return;
    } else {
      if (users[userIndex].finished) return;
    }
    if (!users[userIndex].firewall) {
      dispatch(
        sendWebsocket({
          event: Event.FIREWALL,
          status: true,
          playerId: users[userIndex].id,
          name: users[userIndex].name,
        })
      );
    }
  };

  return {};
};

export default useCallHelpItem;
