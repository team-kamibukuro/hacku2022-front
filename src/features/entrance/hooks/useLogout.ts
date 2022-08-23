import { revokeAuth } from "@/slices/authSlice";
import React from "react";
import { useDispatch } from "react-redux";

const useLogout = () => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(revokeAuth());
    window.location.replace("/");
  };
  return { logout };
};

export default useLogout;
