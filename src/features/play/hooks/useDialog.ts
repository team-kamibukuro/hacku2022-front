import { selectDialog } from "@/slices/playSlice";
import { closeWebsocket } from "@/slices/websocketSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { DialogEvent } from "../types";

const useDialog = () => {
  const dispatch = useDispatch();
  const dialog = useSelector(selectDialog);

  const handleClick = () => {
    switch (dialog.event) {
      case DialogEvent.MatchingWaiting:
        dispatch(closeWebsocket());
        window.location.replace("/entrance");
        break;
      case DialogEvent.Finish:
        dispatch(closeWebsocket());
        window.location.replace("/entrance");
        break;
      case DialogEvent.ConnectionError:
        window.location.replace("/entrance");
      default:
    }
  };

  return { dialog, handleClick };
};

export default useDialog;
