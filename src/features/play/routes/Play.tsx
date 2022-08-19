import OwnEditor from "@monaco-editor/react";
import Layout from "@/components/layouts/Layout";
import StainedGlass from "@/components/layouts/StainedGlass";
import RadioTab from "@/components/ui-elements/RadioTab";
import React from "react";
import Header from "../components/Header";
import UserInfo from "../components/UserInfo";
import useTabVal from "../hooks/useTabVal";
import TerminalWindow from "../components/TerminalWindow";
import { useSelector } from "react-redux";
import { selectPlayers, selectQuestion } from "@/slices/playSlice";
import DontCloseDialog from "@/components/layouts/DontCloseDialog";
import useDialog from "../hooks/useDialog";
import MatchingWaiting from "../components/dialogContents/MatchingWaiting";
import StartGame from "../components/dialogContents/StartGame";
import ServerError from "../components/dialogContents/ServerError";
import Finish from "../components/dialogContents/Finish";
import useSockets from "../hooks/useSockets";
import Toast from "@/components/ui-elements/Toast";
import OtherEditor from "../components/OtherEditor";

export const Play = () => {
  const [tabVal, handleTabChange] = useTabVal();
  const value = `\ndef is_prime(n):\n    if n < 2:\n  # コメントインジェクション！！！      return False\n    for k in range(2, int(n/2)+1):\n        if n % k == 0:\n            return False\n    return True\n`;
  const players = useSelector(selectPlayers);
  const question = useSelector(selectQuestion);

  const { dialog, handleClick } = useDialog();
  const contentComponents = {
    0: MatchingWaiting,
    1: StartGame,
    2: ServerError,
    3: Finish,
    4: MatchingWaiting,
  };
  const Content = contentComponents[dialog.event];

  useSockets();

  return (
    <Layout>
      <StainedGlass />
      <div className="flex flex-col z-50 h-screen w-full">
        <Header />
        <Toast />
        <div className="flex h-[calc(100%_-_68px)]">
          <div className="h-full flex flex-col justify-center items-center w-1/2 py-2 pl-10 pr-5">
            <div className="h-full w-full">
              <div className="flex">
                <RadioTab
                  name={"tab"}
                  state={tabVal}
                  value={["問題", "相手のエディタ"]}
                  onChange={handleTabChange}
                />
              </div>
              <div className="h-[calc(100%_-_33.5px)]">
                {tabVal === "問題" ? (
                  <div className="h-full border-solid border-white bg-editor-back border-2 p-3">
                    <p className="font-dot text-white">{question.context}</p>
                  </div>
                ) : (
                  <>
                    {players.map((player, index) => {
                      return (
                        <div key={index} className="h-full">
                          <p>aaaa</p>
                          <div
                            className={`h-1/3 w-full ${index < 1 && "pb-2"}`}
                            key={index}
                          >
                            <OtherEditor player={player} />
                          </div>
                        </div>
                      );
                    })}
                  </>
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
                  language="python"
                  value={value}
                />
              </div>
              <div className="flex-grow py-5">
                <TerminalWindow></TerminalWindow>
              </div>
            </div>
          </div>
        </div>
        <DontCloseDialog
          handleClick={handleClick}
          open={dialog.open}
          dialogTitle={dialog.title}
          submitTitle={dialog.submitTitle}
          button={dialog.button}
          isNomal={dialog.isNomal}
        >
          <Content />
        </DontCloseDialog>
      </div>
    </Layout>
  );
};
