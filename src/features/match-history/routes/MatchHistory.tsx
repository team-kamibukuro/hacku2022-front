import Layout from "@/components/layouts/Layout";
import StainedGlass from "@/components/layouts/StainedGlass";
import RadioTab from "@/components/ui-elements/RadioTab";
import { selectTargetIndex } from "@/slices/mypageSlice";
import { selectCurrentUser } from "@/slices/playSlice";
import React from "react";
import { useSelector } from "react-redux";
import Content from "../components/Content";
import DiffMonacoEditor from "../components/DiffMonacoEditor";
import Header from "../components/Header";
import MonacoEditor from "../components/MonacoEditor";
import Terminal from "../components/Terminal";
import useDiffCheckBox from "../hooks/useDiffCheckBox";
import useMatchHistoryDetail from "../hooks/useMatchHistoryDetail";
import useTab from "../hooks/useTab";
import Checkbox from "../components/Checkbox";

export const MatchHistory = () => {
  const { tab, tabs, handleTabChange } = useTab();
  const { isDiff, handleChange } = useDiffCheckBox();
  const { data } = useMatchHistoryDetail();
  const currentUser = useSelector(selectCurrentUser);
  const targetIndex = useSelector(selectTargetIndex);

  return (
    <div>
      <Layout>
        <StainedGlass />
        <div className="flex flex-col z-50 h-screen w-full">
          <Header />
          <div className="flex h-[calc(100%_-_68px)]">
            <div className="h-full flex flex-col justify-center items-center w-2/5 py-2 pl-10 pr-5">
              <div className="h-full w-full">
                <div className="flex">
                  <RadioTab
                    name={"match-history-tab"}
                    state={tab}
                    value={tabs}
                    onChange={handleTabChange}
                  />
                </div>
                <div className="h-[calc(100%_-_33.5px)] border-solid border-white bg-editor-back border-2 px-3 pt-3 flex flex-col font-dot">
                  <Content tab={tab} />
                </div>
              </div>
            </div>
            <div className="w-3/5 h-full pr-10 pl-5 py-2">
              <p className="font-dot text-white mb-[0.6em]">
                {currentUser.name}
              </p>
              <div className="h-[calc(100%_-_33.5px)] border-solid border-white bg-editor-back border-2 px-3 pt-3 flex flex-col">
                <div className="mb-1 flex justify-between">
                  <p className="font-dot">
                    {data.histories[targetIndex].debugTime}
                  </p>
                  <div className="font-press">
                    <Checkbox
                      value={"Diff Editor"}
                      checked={isDiff}
                      handleChange={handleChange}
                    />
                  </div>
                </div>
                <div className="flex-grow mb-4">
                  {isDiff ? <DiffMonacoEditor /> : <MonacoEditor />}
                </div>
                <div className="h-2/5 flex flex-col">
                  <p className="font-dot">
                    {" "}
                    {data.histories[targetIndex].isExecuteTest
                      ? "テスト実行結果"
                      : "コンソール実行結果"}
                  </p>
                  <div className="flex-grow py-3">
                    <Terminal />
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
