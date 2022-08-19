import { selectCurrentUser, selectRoom } from "@/slices/playSlice";
import { sendWebsocket, setWebsocket } from "@/slices/websocketSlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Event } from "../types";

const useSockets = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const room = useSelector(selectRoom);

  const notify = (message: string) => toast.dark(message);

  useEffect(() => {
    console.log("Connectinng..");
    const socket = new WebSocket(`ws:///0.0.0.0:8099/play/${room.id}`);
    dispatch(setWebsocket(socket));
    socket.addEventListener("message", function (e) {
      const data = JSON.parse(e.data);
      console.log("Message from server ", data);
      // notify("攻撃された!!");
      console.log(data.event);
      switch (data.event) {
        case Event.CONNECT_SUCCESS:
          CONNECT_SUCCESS();
          break;
        case "Papayas":
          break;
        default:
      }
    });
  }, [dispatch]);

  const CONNECT_SUCCESS = () => {
    dispatch(
      sendWebsocket({
        event: Event.CONNECT_SUCCESS,
        playerId: currentUser.id,
        name: currentUser.name,
        language: currentUser.language,
      })
    );
  };
  return {};
};

export default useSockets;
