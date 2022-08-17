import { selectWebsocket, setWebsocket } from "@/slices/websocketSlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const useSockets = () => {
  const dispatch = useDispatch();
  const socket = useSelector(selectWebsocket);

  useEffect(() => {
    console.log("Connectinng..");
    dispatch(setWebsocket());
  }, [dispatch]);

  useEffect(() => {
    if (socket !== null) {
      console.log(socket);
      socket.addEventListener("message", function (e) {
        const data = JSON.parse(JSON.stringify(e.data));
        console.log("Message from server ", data);
      });
    }
  }, [socket]);

  return {};
};

export default useSockets;
