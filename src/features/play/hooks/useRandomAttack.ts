import { selectCurrentUser, selectPlayers } from "@/slices/playSlice";
import { selectWebsocket } from "@/slices/websocketSlice";
import React from "react";
import { useSelector } from "react-redux";
import { Attack, Event } from "../types";

const useRandomAttack = () => {
  const socket = useSelector(selectWebsocket);
  const currentUser = useSelector(selectCurrentUser);
  const players = useSelector(selectPlayers);
  const users = [currentUser, ...players];
  const attackTypes = Object.values(Attack);

  const callAttack = () => {
    if (currentUser.isMaster) {
      setInterval(() => {
        console.log("random attack");
        const n = Math.random();
        if (n < 0.8) {
          console.log("attack called!");
          randomAttack();
        }
      }, 20000);
    }
  };

  const randomAttack = () => {
    const attackIndex = Math.floor(Math.random() * 3);
    // ! const userIndex = Math.floor(Math.random() * 4); に変える
    const userIndex = Math.floor(Math.random() * 2);
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

  return { callAttack };
};

export default useRandomAttack;
