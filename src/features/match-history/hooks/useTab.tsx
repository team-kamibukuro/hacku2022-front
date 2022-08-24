import React, { useState } from "react";

const useTab = () => {
  const [tab, setTab] = useState("情報");
  const tabs = ["情報", "問題", "履歴"];

  const handleTabChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTab(e.target.value);
  };

  return { tab, tabs, handleTabChange };
};

export default useTab;
