import { selectCurrentUser, selectRoom } from "@/slices/playSlice";
import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { Access, AccessType } from "../types";

const useIsDisabled = (access: AccessType) => {
  const currentUser = useSelector(selectCurrentUser);
  const room = useSelector(selectRoom);

  let isDisabled = true;

  switch (access) {
    case Access.Input:
      isDisabled = room.name.length === 0 || currentUser.language.length === 0;
      break;
    case Access.Create:
      isDisabled = room.name.length === 0 || currentUser.language.length === 0;
      break;
    case Access.Matching:
      isDisabled = currentUser.language.length === 0;
      break;
    default:
  }

  return { isDisabled };
};
export default useIsDisabled;
