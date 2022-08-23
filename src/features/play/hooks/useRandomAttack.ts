import {
  selectAttackIsRunning,
  selectCurrentUser,
  selectPlayers,
} from "@/slices/playSlice";
import React from "react";
import { useSelector } from "react-redux";
import { Attack, Event } from "../types";
import useInterval from "use-interval";
import { useDispatch } from "react-redux";
import { sendWebsocket } from "@/slices/websocketSlice";

const useRandomAttack = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const players = useSelector(selectPlayers);
  const attackIsRunning = useSelector(selectAttackIsRunning);
  const users = [currentUser, ...players];
  const attackTypes = Object.values(Attack);

  useInterval(
    () => {
      console.log("random attack");
      const n = Math.random();

      if (n < 0.5) {
        console.log("attack called!");
        randomAttack();
      }
    },
    attackIsRunning ? 10000 : null
  );

  const randomAttack = () => {
    const attackIndex = Math.floor(Math.random() * attackTypes.length);
    const userIndex = Math.floor(Math.random() * users.length);

    if (attackTypes[attackIndex] === Attack.RANSOMWARE) {
      if (users[userIndex].heart !== 0) {
        dispatch(
          sendWebsocket({
            event: Event.ATTACK,
            attackType: attackTypes[attackIndex],
            playerId: users[userIndex].id,
            name: users[userIndex].name,
            heart: users[userIndex].heart - 1,
            firewall: users[userIndex].firewall,
          })
        );
      }
    } else {
      dispatch(
        sendWebsocket({
          event: Event.ATTACK,
          attackType: attackTypes[attackIndex],
          playerId: users[userIndex].id,
          name: users[userIndex].name,
          language: users[userIndex].language,
          code: users[userIndex].code,
          firewall: users[userIndex].firewall,
        })
      );
    }
  };

  return {};
};

export default useRandomAttack;
