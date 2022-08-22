import { selectCurrentUser } from "@/slices/playSlice";
import { sendWebsocket } from "@/slices/websocketSlice";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import useInterval from "use-interval";
import { Event } from "../types";

const useFirewall = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  useInterval(
    () => {
      dispatch(
        sendWebsocket({
          event: Event.FIREWALL,
          status: false,
          playerId: currentUser.id,
          name: currentUser.name,
        })
      );
    },
    currentUser.firewall ? 60000 : null
  );

  return {};
};

export default useFirewall;
