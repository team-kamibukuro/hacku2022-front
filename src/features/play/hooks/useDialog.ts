import useBasicButtonSound from "@/hooks/sounds/ButtonSounds/useBasicButtonSound";
import useCancelButtonSound from "@/hooks/sounds/ButtonSounds/useCancelButtonSound";
import { selectCurrentUser, selectDialog } from "@/slices/playSlice";
import { closeWebsocket } from "@/slices/websocketSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { DialogEvent } from "../types";

const useDialog = () => {
  const dispatch = useDispatch();
  const dialog = useSelector(selectDialog);
  const currentUser = useSelector(selectCurrentUser);
  const [playCancelButton] = useCancelButtonSound();
  const [playBasicButton] = useBasicButtonSound();

  const handleClick = () => {
    switch (dialog.event) {
      case DialogEvent.MatchingWaiting:
        dispatch(closeWebsocket({ id: currentUser.id }));
        window.location.replace("/entrance");
        playCancelButton();
        break;
      case DialogEvent.Finish:
        dispatch(closeWebsocket({ id: currentUser.id }));
        window.location.replace("/entrance");
        playBasicButton();
        break;
      case DialogEvent.ConnectionError:
        window.location.replace("/entrance");
        playBasicButton();
      default:
    }
  };

  return { dialog, handleClick };
};

export default useDialog;
