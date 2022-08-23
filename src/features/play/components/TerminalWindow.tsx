import React, { useState } from "react";
import RadioTab from "@/components/ui-elements/RadioTab";
import Terminal from "@/features/play/components/Terminal";
import Button, { ButtonStyle } from "@/components/ui-elements/Button";
import useTerminalWindow from "../hooks/useTerminalWindow";

const TerminalWindow = () => {
  const { tab, currentUser, handleChange, submitConsole, submitTest } =
    useTerminalWindow();
  const tabValue = ["コンソール", "テスト結果"];

  return (
    <div className="h-full flex flex-col">
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
      <div className="flex-grow mb-2">
        <Terminal
          result={
            tab === "コンソール"
              ? currentUser.consoleResultValue
              : currentUser.testResultValue
          }
        />
      </div>
      <div className="justify-end flex">
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
