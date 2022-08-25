import useLinkButtonSound from "@/hooks/sounds/ButtonSounds/useLinkButtonSound";
import { revokeAuth } from "@/slices/authSlice";
import React from "react";
import { useDispatch } from "react-redux";

const useLogout = () => {
  const dispatch = useDispatch();
  const [playLinkButton] = useLinkButtonSound();

  const logout = () => {
    playLinkButton();
    dispatch(revokeAuth());
    window.location.replace("/");
  };
  return { logout };
};

export default useLogout;
