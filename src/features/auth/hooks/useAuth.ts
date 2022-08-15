import React, { useCallback, useState } from "react";

const useAuth = () => {
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

  const authUser = useCallback(() => {
    console.log();
  }, []);

  return { isLogin, changeMode, handleInputChange, authUser };
};

export default useAuth;
