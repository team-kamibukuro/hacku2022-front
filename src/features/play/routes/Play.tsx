import Layout from "@/components/layouts/Layout";
import StainedGlass from "@/components/layouts/StainedGlass";
import RadioTab from "@/components/ui-elements/RadioTab";
import React from "react";
import Header from "../components/Header";
import UserInfo from "../components/UserInfo";
import useTabVal from "../hooks/useTabVal";
import TerminalWindow from "../components/TerminalWindow";
import DontCloseDialog from "@/components/layouts/DontCloseDialog";
import useDialog from "../hooks/useDialog";
import MatchingWaiting from "../components/dialogContents/MatchingWaiting";
import StartGame from "../components/dialogContents/StartGame";
import ServerError from "../components/dialogContents/ServerError";
import Finish from "../components/dialogContents/Finish";
import useSockets from "../hooks/useSockets";
import Toast from "@/components/ui-elements/Toast";
import OtherEditor from "../components/OtherEditor";
import useRandomAttack from "../hooks/useRandomAttack";
import useHeart from "../hooks/useHeart";
import useCallHelpItem from "../hooks/useCallHelpItem";
import useFirewall from "../hooks/useFirewall";
import useRequireAuth from "@/hooks/useRequireAuth";
import ConnectionError from "../components/dialogContents/ConnectionError";
import None from "../components/dialogContents/None";
import useCatchConnectionError from "../hooks/useCatchConnectionError";
import OwnEditor from "../components/OwnEditor";

export const Play = () => {
  const [tabVal, handleTabChange] = useTabVal();

  const { dialog, handleClick } = useDialog();
  const contentComponents = {
    0: MatchingWaiting,
    1: StartGame,
    2: ServerError,
    3: Finish,
    4: None,
    5: ConnectionError,
  };
  const Content = contentComponents[dialog.event];

  const { currentUser, players, question } = useSockets();

  useRequireAuth();
  useCatchConnectionError();
  useRandomAttack();
  useCallHelpItem();
  useFirewall();
  useHeart();

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
              <div className="mb-1">
                <UserInfo
                  name={currentUser.name}
                  heartbeat={currentUser.heart}
                  finished={currentUser.finish.finished}
                  firewall={currentUser.firewall}
                />
              </div>
              <div className="h-80">
                <OwnEditor />
              </div>
              <div className="flex-grow py-5">
                <TerminalWindow></TerminalWindow>
              </div>
            </div>
          </div>
        </div>
        {dialog.open && (
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
        )}
      </div>
    </Layout>
  );
};
