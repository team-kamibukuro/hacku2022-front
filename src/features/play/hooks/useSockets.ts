import { selectRoom } from "@/slices/playSlice";
import { setWebsocket } from "@/slices/websocketSlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const useSockets = () => {
  const dispatch = useDispatch();
  const room = useSelector(selectRoom);

  const notify = (message: string) => toast.dark(message);

  useEffect(() => {
    console.log("Connectinng..");
    const socket = new WebSocket(`ws:///0.0.0.0:8099/play/${room.id}`);
    dispatch(setWebsocket(socket));
    socket.addEventListener("message", function (e) {
      const data = JSON.parse(JSON.stringify(e.data));
      console.log("Message from server ", data);
      // notify("攻撃された!!");
    });
  }, [dispatch]);

  return {};
};

export default useSockets;
