import { setDialog } from "@/slices/playSlice";
import {
  selectWebsocketAbend,
  selectWebsocketNormalend,
} from "@/slices/websocketSlice";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { DialogEvent } from "../types";

const useCatchConnectionError = () => {
  const dispatch = useDispatch();
  const websocketAbend = useSelector(selectWebsocketAbend);
  const websocketNomalend = useSelector(selectWebsocketNormalend);
  const firstLoadRef = useRef(true);

  useEffect(() => {
    if (firstLoadRef.current) {
      firstLoadRef.current = false;
      return;
    }

    if (websocketAbend && !websocketNomalend) {
      dispatch(setDialog(DialogEvent.ConnectionError));
    }
  }, [websocketAbend]);
  return {};
};

export default useCatchConnectionError;
