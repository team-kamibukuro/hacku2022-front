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
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Access, AccessType } from "../types";

const useDialog = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector(selectCurrentUser);
  const auth = useSelector(selectAuth);
  const room = useSelector(selectRoom);

  const [open, setOpen] = useState(false);
  const [access, setAccess] = useState<AccessType>(Access.Input);
  const [dialogTitle, setdialogTitle] = useState("");

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

  const handleClickClose = useCallback(() => {
    setOpen(false);
    dispatch(reset());

    dispatch(
      initCurrentUser({
        id: auth.currentUser.id,
        name: auth.currentUser.name,
      })
    );
  }, [dispatch]);

  const input = useCallback(() => {
    setOpen(true);
    setAccess(Access.Input);
    setdialogTitle("Input Room Name");
  }, []);

  const create = useCallback(() => {
    setOpen(true);
    setAccess(Access.Create);
    setdialogTitle("Create Room");
  }, []);

  const matching = useCallback(() => {
    setOpen(true);
    setAccess(Access.Matching);
    setdialogTitle("Matching");
  }, []);

  const handleClick = async () => {
    switch (access) {
      case Access.Create:
        const createRoomParams = {
          masterUserId: auth.currentUser.id,
          roomName: room.name,
        };
        dispatch(fetchAsyncCreateRoom(createRoomParams));
        break;
      case Access.Input:
        const authRoomParams = {
          roomName: room.name,
        };
        dispatch(fetchAsyncAuthRoom(authRoomParams));
        break;
      case Access.Matching:
        const matchingParams = {
          userId: currentUser.id,
        };
        dispatch(fetchAsyncMatching(matchingParams));
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
