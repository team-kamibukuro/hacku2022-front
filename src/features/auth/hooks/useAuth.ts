import { fetchAsyncLogin, fetchAsyncRegister } from "@/slices/authSlice";
import { AppDispatch } from "@/store";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

const useAuth = () => {
  const dispatch: AppDispatch = useDispatch();

  const [isLogin, setIsLogin] = useState(true);
  const [credential, setCredential] = useState({
    nickname: "",
    email: "",
    password: "",
  });

  const changeMode = () => {
    setIsLogin(!isLogin);
  };

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const name = e.target.name;
      setCredential({ ...credential, [name]: value });
    },
    []
  );

  const authUser = useCallback(async () => {
    if (isLogin) {
      const params = {
        userEmail: credential.email,
        userPassword: credential.password,
      };
      await dispatch(fetchAsyncLogin(params));
    } else {
      const params = {
        userEmail: credential.email,
        userPassword: credential.password,
        userName: credential.nickname,
      };
      await dispatch(fetchAsyncRegister(params));
    }
  }, []);

  return { isLogin, changeMode, handleInputChange, authUser };
};

export default useAuth;
