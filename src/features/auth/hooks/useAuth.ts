import {
  fetchAsyncLogin,
  fetchAsyncRegister,
  revokeAuth,
  selectAuth,
  switchIsLoginView,
} from "@/slices/authSlice";
import { TypedDispatch } from "@/store";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const useAuth = () => {
  const dispatch = useDispatch<TypedDispatch>();

  const auth = useSelector(selectAuth);
  const isLoginView = auth.isLoginView;

  const notify = (message: string) => {
    toast.dark(message);
  };

  const [credential, setCredential] = useState({
    nickname: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    dispatch(revokeAuth());
  }, []);

  const changeMode = useCallback(() => {
    dispatch(switchIsLoginView());
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    setCredential({ ...credential, [name]: value });
  };

  const authUser = async () => {
    console.log(isLoginView);
    if (isLoginView) {
      const params = {
        userEmail: credential.email,
        userPassword: credential.password,
      };
      console.log(params);
      dispatch(fetchAsyncLogin(params))
        .unwrap()
        .then(() => {})
        .catch((e) => {
          console.log(e);
          notify("emailとpasswordが間違っています。");
        });
    } else {
      const params = {
        userEmail: credential.email,
        userPassword: credential.password,
        userName: credential.nickname,
      };
      console.log(params);
      dispatch(fetchAsyncRegister(params))
        .unwrap()
        .then(() => {})
        .catch((e) => {
          console.log(e);
          notify("このmailアドレスはすでに存在しています。");
        });
    }
  };

  return {
    isLoginView,
    credential,
    changeMode,
    handleInputChange,
    authUser,
  };
};

export default useAuth;
