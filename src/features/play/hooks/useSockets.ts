import {
  selectCurrentUser,
  selectQuestion,
  selectRoom,
  setDialog,
  setPlayer,
  setQuestion,
} from "@/slices/playSlice";
import {
  selectWebsocket,
  sendWebsocket,
  setWebsocket,
} from "@/slices/websocketSlice";
import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { DialogEvent, Event } from "../types";

const useSockets = () => {
  const dispatch = useDispatch();
  const sock = useSelector(selectWebsocket);
  const currentUser = useSelector(selectCurrentUser);
  const room = useSelector(selectRoom);
  const question = useSelector(selectQuestion);
  const refFirstRef = useRef(true);

  const notify = (message: string) => toast.dark(message);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      if (refFirstRef.current) {
        refFirstRef.current = false;
        return;
      }
    }

    console.log("Connectinng..");
    const socket = new WebSocket(`ws://localhost:8099/play/${room.id}`);
    dispatch(setWebsocket(socket));
    socket.onopen = () =>
      socket.send(
        JSON.stringify({
          event: Event.CONNECT_SUCCESS,
          playerId: currentUser.id,
          name: currentUser.name,
          language: currentUser.language,
        })
      );
    socket.addEventListener("message", function (e) {
      const data = JSON.parse(e.data);
      console.log("Message from server ", data);
      // notify("攻撃された!!");
      console.log(data.event);
      switch (data.event) {
        case Event.READY:
          READY(data);
          break;
        default:
      }
    });
  }, []);

  const READY = (data) => {
    dispatch(
      setQuestion({
        id: data.question.id,
        name: data.question.name,
        context: data.question.context,
      })
    );
    dispatch(setPlayer(data.players));
    dispatch(setDialog(DialogEvent.StartGame));
  };

  return {};
};

export default useSockets;
