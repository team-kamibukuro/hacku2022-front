import {
  selectAttackIsRunning,
  selectCurrentUser,
  selectPlayers,
} from "@/slices/playSlice";
import { selectWebsocket } from "@/slices/websocketSlice";
import React from "react";
import { useSelector } from "react-redux";
import { Attack, Event } from "../types";
import useInterval from "use-interval";

const useRandomAttack = () => {
  const socket = useSelector(selectWebsocket);
  const currentUser = useSelector(selectCurrentUser);
  const players = useSelector(selectPlayers);
  const attackIsRunning = useSelector(selectAttackIsRunning);
  const users = [currentUser, ...players];
  const attackTypes = Object.values(Attack);

  useInterval(
    () => {
      console.log("random attack");
      const n = Math.random();

      if (n < 0.8) {
        console.log("attack called!");
        randomAttack();
      }
    },
    attackIsRunning ? 10000 : null
  );

  const randomAttack = () => {
    const attackIndex = Math.floor(Math.random() * 3);
    const userIndex = Math.floor(Math.random() * users.length);
    socket.send(
      JSON.stringify({
        event: Event.ATTACK,
        attackType: attackTypes[attackIndex],
        playerId: users[userIndex].id,
        name: users[userIndex].name,
        language: users[userIndex].language,
        code: users[userIndex].code,
      })
    );
  };

  return {};
};

export default useRandomAttack;
