import { selectAuth } from "@/slices/authSlice";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const useRequireAuth = () => {
  const auth = useSelector(selectAuth);

  useEffect(() => {
    if (!auth.isAuth) window.location.replace("/");
  }, [auth.isAuth]);

  return {};
};

export default useRequireAuth;
