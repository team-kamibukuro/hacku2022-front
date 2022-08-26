import Error from "@/components/Error";
import Layout from "@/components/layouts/Layout";
import StainedGlass from "@/components/layouts/StainedGlass";
import SubPage from "@/components/layouts/SubPage";
import Loding from "@/components/Loding";
import useLinkButtonSound from "@/hooks/sounds/ButtonSounds/useLinkButtonSound";
import React from "react";
import HistoryRadioList from "../components/HistoryRadioList";
import useMatchHistory from "../hooks/useMatchHistory";

export const MatchHistoryTop = () => {
  const { historys, isLoading, isError, value, handleChange, onClick } =
    useMatchHistory();
  const [playLinkButton] = useLinkButtonSound();

  if (isLoading) return <Loding />;
  if (isError) return <Error />;
  return (
    <div>
      <Layout>
        <StainedGlass />
        <SubPage title={"Match History"}>
          <div className="flex-grow overflow-scroll my-8">
            <div className="flex flex-col">
              <HistoryRadioList
                name={"history"}
                state={value}
                items={historys}
                onChange={handleChange}
                onClick={onClick}
              />
            </div>
          </div>
          <div
            onClick={() => {
              playLinkButton();
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
