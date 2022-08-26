import useBasicButtonSound from "@/hooks/sounds/ButtonSounds/useBasicButtonSound";
import useCancelButtonSound from "@/hooks/sounds/ButtonSounds/useCancelButtonSound";
import useEnterButtonSound from "@/hooks/sounds/ButtonSounds/useEnterButtonSound";
import { selectAuth } from "@/slices/authSlice";
import { loadedEntrance } from "@/slices/entranceSlice";
import {
  initCurrentUser,
  reset,
  selectCurrentUser,
  selectRoom,
} from "@/slices/playSlice";
import {
  fetchAsyncAuthRoom,
  fetchAsyncCreateRoom,
  fetchAsyncMatching,
} from "@/slices/playSlice/api";
import { TypedDispatch } from "@/store";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Access, AccessType } from "../types";
import { toast } from "react-toastify";
import useBeepSound from "@/hooks/sounds/SoundEffects/useBeepSound";

const useDialog = () => {
  const dispatch = useDispatch<TypedDispatch>();

  const currentUser = useSelector(selectCurrentUser);
  const auth = useSelector(selectAuth);
  const room = useSelector(selectRoom);

  const [open, setOpen] = useState(false);
  const [access, setAccess] = useState<AccessType>(Access.Input);
  const [dialogTitle, setdialogTitle] = useState("");

  const [playBasicButton] = useBasicButtonSound();
  const [playEnterButton] = useEnterButtonSound();
  const [playCancelButton] = useCancelButtonSound();
  const [playBeep] = useBeepSound();

  const notify = (message: string) => {
    toast.dark(message, {
      icon: "😲",
    });
  };

  useEffect(() => {
    dispatch(reset());
    dispatch(
      initCurrentUser({
        id: auth.currentUser.id,
        name: auth.currentUser.name,
      })
    );
    if (localStorage.getItem("end_date") != null) {
      localStorage.removeItem("end_date");
    }
    if (localStorage.getItem("end_date_serverdown") != null) {
      localStorage.removeItem("end_date_serverdown");
    }
    dispatch(loadedEntrance());
  }, [dispatch]);

  const handleClickClose = () => {
    setOpen(false);
    dispatch(reset());
    playCancelButton();

    dispatch(
      initCurrentUser({
        id: auth.currentUser.id,
        name: auth.currentUser.name,
      })
    );
  };

  const input = () => {
    setOpen(true);
    setAccess(Access.Input);
    setdialogTitle("Input Room Name");
    playBasicButton();
  };

  const create = () => {
    setOpen(true);
    setAccess(Access.Create);
    setdialogTitle("Create Room");
    playBasicButton();
  };

  const matching = () => {
    setOpen(true);
    setAccess(Access.Matching);
    setdialogTitle("Matching");
    playBasicButton();
  };

  const handleClick = () => {
    switch (access) {
      case Access.Create:
        const createRoomParams = {
          masterUserId: auth.currentUser.id,
          roomName: room.name,
          isDemo: room.isDemo,
          maxPlayer: room.maxPlayer,
        };
        dispatch(fetchAsyncCreateRoom(createRoomParams))
          .unwrap()
          .then(() => {
            playEnterButton();
          })
          .catch((e) => {
            console.log(e);
            notify(
              "このルームはすでに作られています。別のルーム名を入力してください。"
            );
            playBeep();
          });
        break;
      case Access.Input:
        const authRoomParams = {
          roomName: room.name,
        };
        dispatch(fetchAsyncAuthRoom(authRoomParams))
          .unwrap()
          .then(() => {
            playEnterButton();
          })
          .catch((e) => {
            console.log(e);
            notify("ルームが存在しません。ルーム名を確認してください。");
            playBeep();
          });
        break;
      case Access.Matching:
        const matchingParams = {
          userId: currentUser.id,
        };
        dispatch(fetchAsyncMatching(matchingParams));
        playEnterButton();
        break;
      default:
    }
  };

  return {
    open,
    access,
    dialogTitle,
    input,
    create,
    matching,
    handleClick,
    handleClickClose,
  } as const;
};

export default useDialog;
