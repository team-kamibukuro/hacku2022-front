import {
  editCurrentUser,
  editRoom,
  reset,
  selectCurrentUser,
  selectRoom,
} from "@/slices/playSlice";
import {
  fetchAsyncAuthRoom,
  fetchAsyncCreateRoom,
} from "@/slices/playSlice/api";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Access, AccessType } from "../types";

const useDialog = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector(selectCurrentUser);
  const room = useSelector(selectRoom);

  const [open, setOpen] = useState(false);
  const [access, setAccess] = useState<AccessType>(Access.Input);
  const [dialogTitle, setdialogTitle] = useState("");

  useEffect(() => {
    dispatch(reset());
  }, []);

  const handleClickClose = useCallback(() => {
    setOpen(false);
    dispatch(editCurrentUser({ ...currentUser, language: "" }));
    dispatch(editRoom({ ...room, name: "" }));

    dispatch(reset());
  }, []);

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

  const handleClick = useCallback(async () => {
    switch (access) {
      case Access.Create:
        const createRoomParams = {
          masterUserId: currentUser.id,
          roomName: room.name,
        };
        await dispatch(fetchAsyncCreateRoom(createRoomParams));
        break;
      case Access.Input:
        const authRoomParams = {
          masterUserId: currentUser.id,
          roomName: room.name,
        };
        await dispatch(fetchAsyncAuthRoom(authRoomParams));
        break;
      default:
    }
  }, []);

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
