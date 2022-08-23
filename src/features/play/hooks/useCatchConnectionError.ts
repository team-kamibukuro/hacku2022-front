import { setDialog } from "@/slices/playSlice";
import { selectWebsocketOpen } from "@/slices/websocketSlice";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { DialogEvent } from "../types";

const useCatchConnectionError = () => {
  const dispatch = useDispatch();
  const websocketOpen = useSelector(selectWebsocketOpen);
  const firstLoadRef = useRef(true);

  useEffect(() => {
    if (firstLoadRef.current) {
      firstLoadRef.current = false;
      return;
    }

    if (!websocketOpen) {
      dispatch(setDialog(DialogEvent.ConnectionError));
    }
  }, [websocketOpen]);
  return {};
};

export default useCatchConnectionError;
