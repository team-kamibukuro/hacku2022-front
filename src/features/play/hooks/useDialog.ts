import { selectDialog } from "@/slices/playSlice";
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
        // TODO: Websocketの接続を切る
        window.location.replace("/entrance");
        break;
      case DialogEvent.Finish:
        // TODO: Websocketの接続を切る
        window.location.replace("/entrance");
        break;
      default:
    }
  };

  return { dialog, handleClick };
};

export default useDialog;
