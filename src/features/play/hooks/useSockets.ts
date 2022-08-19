import { selectWebsocket, setWebsocket } from "@/slices/websocketSlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const useSockets = () => {
  const dispatch = useDispatch();
  const socket = useSelector(selectWebsocket);

  const notify = (message: string) => toast.dark(message);

  useEffect(() => {
    console.log("Connectinng..");
    dispatch(setWebsocket());
  }, [dispatch]);

  useEffect(() => {
    if (socket !== null) {
      socket.addEventListener("message", function (e) {
        const data = JSON.parse(JSON.stringify(e.data));
        console.log("Message from server ", data);
        notify("攻撃された!!");
      });
    }
  }, [socket]);

  return {};
};

export default useSockets;
