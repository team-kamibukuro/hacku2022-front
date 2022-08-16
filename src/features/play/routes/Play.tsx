import OwnEditor from "@monaco-editor/react";
import Layout from "@/components/layouts/Layout";
import StainedGlass from "@/components/layouts/StainedGlass";
import RadioTab from "@/components/ui-elements/RadioTab";
import React from "react";
import Header from "../components/Header";
import OtherEditor from "../components/OtherEditor";
import UserInfo from "../components/UserInfo";
import useTabVal from "../hooks/useTabVal";
import TerminalWindow from "../components/TerminalWindow";
import { useSelector } from "react-redux";
import { selectPlayers } from "@/slices/playSlice";

export const Play = () => {
  const [tabVal, handleTabChange] = useTabVal();
  const tabValue = ["問題", "相手のエディタ"];
  const value = `console.log("test");`;
  const players = useSelector(selectPlayers);

  return (
    <Layout>
      <StainedGlass />
      <div className="flex flex-col z-50 h-screen w-full">
        <Header />
        <div className="flex h-[calc(100%_-_68px)]">
          <div className="h-full flex flex-col justify-center items-center w-1/2 py-2 pl-10 pr-5">
            <div className="h-full w-full">
              <div className="flex">
                <RadioTab
                  name={"tab"}
                  state={tabVal}
                  value={tabValue}
                  onChange={handleTabChange}
                />
              </div>
              <div className="h-[calc(100%_-_33.5px)]">
                {tabVal === "問題" ? (
                  <div className="h-full border-solid border-white bg-editor-back border-2 p-3">
                    <p className="font-dot text-white">問題文が入ります。</p>
                  </div>
                ) : (
                  <div className="h-full">
                    <>
                      {players.map((player, index) => {
                        <div
                          className={`h-1/3 w-full ${index < 1 && "pb-2"}`}
                          key={index}
                        >
                          <OtherEditor player={player} />
                        </div>;
                      })}
                    </>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="w-1/2 h-full pr-10 pl-5 py-2">
            <p className="font-dot text-white mb-[0.6em]">あなたのエディタ</p>
            <div className="h-[calc(100%_-_33.5px)] border-solid border-white bg-editor-back border-2 px-3 pt-3 flex flex-col">
              <div>
                <UserInfo name={"かずき"} heartbeat={3} />
              </div>
              <div className="h-80">
                <OwnEditor
                  height="100%"
                  theme="hc-black"
                  language="javascript"
                  value={value}
                />
              </div>
              <div className="flex-grow py-5">
                <TerminalWindow></TerminalWindow>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
