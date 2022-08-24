import Layout from "@/components/layouts/Layout";
import StainedGlass from "@/components/layouts/StainedGlass";
import SubPage from "@/components/layouts/SubPage";
import Radio from "@/components/ui-elements/Radio";
import React from "react";
import useMatchHistory from "../hooks/useMatchHistory";

export const MatchHistoryTop = () => {
  const { historys, value, handleChange } = useMatchHistory();

  return (
    <div>
      <Layout>
        <StainedGlass />
        <SubPage title={"Match History"}>
          <div className="flex-grow">
            <div className="flex flex-col">
              <Radio
                name={"history"}
                state={value}
                items={historys}
                onChange={handleChange}
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
