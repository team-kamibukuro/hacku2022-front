import Layout from "@/components/layouts/Layout";
import StainedGlass from "@/components/layouts/StainedGlass";
import RadioTab from "@/components/ui-elements/RadioTab";
import Editor from "@monaco-editor/react";
import React from "react";
import Header from "../components/Header";
import Info from "../components/Info";
import MonacoEditor from "../components/MonacoEditor";
import Terminal from "../components/Terminal";

export const MatchHistory = () => {
  const name = "ななし";
  const time = "13:24";
  return (
    <div>
      <Layout>
        {/* <StainedGlass /> */}
        <div className="flex flex-col z-50 h-screen w-full">
          <Header />
          <div className="flex h-[calc(100%_-_68px)]">
            <div className="h-full flex flex-col justify-center items-center w-1/2 py-2 pl-10 pr-5">
              <div className="h-full w-full">
                <div className="flex">
                  <RadioTab
                    name={"match-history-tab"}
                    state={"情報"}
                    value={["情報", "問題", "履歴"]}
                    onChange={() => {}}
                  />
                </div>
                <div className="h-[calc(100%_-_33.5px)] border-solid border-white bg-editor-back border-2 px-3 pt-3 flex flex-col font-dot">
                  <Info />
                </div>
              </div>
            </div>
            <div className="w-1/2 h-full pr-10 pl-5 py-2">
              <p className="font-dot text-white mb-[0.6em]">{name}</p>
              <div className="h-[calc(100%_-_33.5px)] border-solid border-white bg-editor-back border-2 px-3 pt-3 flex flex-col">
                <div className="mb-1">
                  <p className="font-dot">{time}</p>
                </div>
                <div className="flex-grow mb-4">
                  <MonacoEditor />
                </div>
                <div className="h-2/5 flex flex-col">
                  <p className="font-dot">テスト結果</p>
                  <div className="flex-grow py-3">
                    <Terminal result={"test1 clear"} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};
