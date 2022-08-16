import React, { useState } from "react";

const useTabVal = (): [
  string,
  (e: React.ChangeEvent<HTMLInputElement>) => void
] => {
  const [tabVal, setTabVal] = useState("問題");
  const handleTabChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTabVal(e.target.value);

  return [tabVal, handleTabChange];
};

export default useTabVal;
