import {
  editCurrentUser,
  editRoom,
  selectCurrentUser,
  selectRoom,
} from "@/slices/playSlice";
import { persistor } from "@/store";
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

  const purge = () => {
    persistor
      .purge()
      .then(() => {
        return persistor.flush();
      })
      .then(() => {
        persistor.pause();
      });
  };

  useEffect(() => {
    purge();
  }, []);

  const handleClickClose = useCallback(() => {
    setOpen(false);
    dispatch(editCurrentUser({ ...currentUser, language: "" }));
    dispatch(editRoom({ ...room, name: "" }));
    purge();
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

  const handleClick = useCallback(() => {}, []);

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
