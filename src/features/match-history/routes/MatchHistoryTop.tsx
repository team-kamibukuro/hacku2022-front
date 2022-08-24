import Layout from "@/components/layouts/Layout";
import StainedGlass from "@/components/layouts/StainedGlass";
import SubPage from "@/components/layouts/SubPage";
import Radio from "@/components/ui-elements/Radio";
import React from "react";

export const MatchHistoryTop = () => {
  const historys = [
    {
      value: "1",
      label: "2022/8/24 13:00 mei vs kazuki vs 空飛ぶ農家 vs はまだ",
    },
    {
      value: "2",
      label: "2022/8/24 13:00 mei vs kazuki vs 空飛ぶ農家 vs はまだ",
    },
    {
      value: "3",
      label: "2022/8/24 13:00 mei vs kazuki vs 空飛ぶ農家 vs はまだ",
    },
    {
      value: "4",
      label: "2022/8/24 13:00 mei vs kazuki vs 空飛ぶ農家 vs はまだ",
    },
    {
      value: "5",
      label: "2022/8/24 13:00 mei vs kazuki vs 空飛ぶ農家 vs はまだ",
    },
    {
      value: "6",
      label: "2022/8/24 13:00 mei vs kazuki vs 空飛ぶ農家 vs はまだ",
    },
  ];
  return (
    <div>
      <Layout>
        <StainedGlass />
        <SubPage title={"Match History"}>
          <div className="flex-grow">
            <div className="flex flex-col">
              <Radio
                name={"history"}
                state={"1"}
                items={historys}
                onChange={() => {}}
              />
            </div>
          </div>
          <div
            onClick={() => {
              window.location.href = "/mypage";
            }}
          >
            <span className="font-press text-lg -mt-0.5 text-white hover:text-yellow-400">
              &lt;&lt; Back
            </span>
          </div>
        </SubPage>
      </Layout>
    </div>
  );
};
