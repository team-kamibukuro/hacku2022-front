import React, { useState } from "react";
import RadioTab from "@/components/ui-elements/RadioTab";
import Terminal from "@/features/play/components/Terminal";
import Button, { ButtonStyle } from "@/components/ui-elements/Button";
import useTerminalWindow from "../hooks/useTerminalWindow";

const TerminalWindow = () => {
  const {
    tab,
    consoleResult,
    testResult,
    handleChange,
    submitConsole,
    submitTest,
  } = useTerminalWindow();
  const tabValue = ["コンソール", "テスト結果"];

  return (
    <div className="h-full relative">
      <div className="flex">
        <div className="mr-3">
          <RadioTab
            name={"terminal"}
            state={tab}
            value={tabValue}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="h-4/5 mb-1">
        <Terminal result={tab === "コンソール" ? consoleResult : testResult} />
      </div>
      <div className="absolute right-0 flex">
        <div className="mr-5">
          <Button
            onClick={submitConsole}
            buttonStyle={ButtonStyle.isNomal}
            font={"dot"}
          >
            実行
          </Button>
        </div>
        <Button
          onClick={submitTest}
          buttonStyle={ButtonStyle.isPrimary}
          font={"dot"}
        >
          テストを実行
        </Button>
      </div>
    </div>
  );
};

export default TerminalWindow;
