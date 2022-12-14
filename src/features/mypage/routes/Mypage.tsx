import Layout from "@/components/layouts/Layout";
import StainedGlass from "@/components/layouts/StainedGlass";
import React from "react";
import { Avatar } from "@mui/material";
import Jewelry from "@/common/icons/jewelry/jewelry_round_purple.svg";
import Button, { ButtonStyle } from "@/components/ui-elements/Button";
import SubPage from "@/components/layouts/SubPage";
import useMypage from "../hooks/useMypage";
import RankBadge from "@/components/ui-elements/RankBadge";
import useBasicButtonSound from "@/hooks/sounds/ButtonSounds/useBasicButtonSound";
import useLinkButtonSound from "@/hooks/sounds/ButtonSounds/useLinkButtonSound";
import Loding from "@/components/Loding";
import Error from "@/components/Error";

export const Mypage = () => {
  const { data, isLoading, isError, currentUser } = useMypage();
  const rankBadgeTitle = [
    "Gord Red",
    "Gord Blue",
    "Silver Red",
    "Silver Blue",
    "Bronze Red",
    "Bronze Blue",
  ];

  const [playBasicButton] = useBasicButtonSound();
  const [playLinkButton] = useLinkButtonSound();

  if (isLoading) return <Loding />;
  if (isError) return <Error />;
  return (
    <Layout>
      <StainedGlass />
      <SubPage title={"Mypage"}>
        <div className="w-full flex-grow mt-10">
          <div className="m-auto" style={{ width: "fit-content" }}>
            <div className="nes-container is-dark text-left w-[470px]">
              <div className="flex justify-start items-start mb-6">
                <Avatar sx={{ width: 80, height: 80 }} className="mr-4" />
                <div>
                  <p className="font-dot text-xl my-3 font-medium">
                    {currentUser.name}
                  </p>
                  <div className="flex items-center justify-center mb-2">
                    <div className="w-10 mr-2">
                      <RankBadge rank={data.rankBadge} />
                    </div>
                    <p className="font-dot">
                      {rankBadgeTitle[data.rankBadge - 1]}
                    </p>
                  </div>
                  <p className="font-dot">SCORE: {data.score}</p>
                </div>
              </div>
              <div className="flex flex-col">
                <div></div>
                <Button
                  onClick={() => {
                    playBasicButton();
                    window.location.href = "/mypage/match-history/";
                  }}
                  buttonStyle={ButtonStyle.isPrimary}
                  font={"press"}
                >
                  Match History
                </Button>
                <div className="my-1"></div>
                <Button
                  onClick={() => {
                    playBasicButton();
                  }}
                  buttonStyle={ButtonStyle.isNomal}
                  font={"press"}
                >
                  Setting
                </Button>
                <div className="my-1"></div>
                <Button
                  onClick={() => {
                    playBasicButton();
                  }}
                  buttonStyle={ButtonStyle.isNomal}
                  font={"press"}
                >
                  Guide
                </Button>
              </div>
            </div>
          </div>
          <div className="w-[390px]"></div>
        </div>
        <div
          onClick={() => {
            playLinkButton();
            window.location.href = "/entrance/";
          }}
        >
          <span className="font-press text-lg -mt-0.5 text-white hover:text-yellow-400">
            &lt;&lt; Back
          </span>
        </div>
      </SubPage>
    </Layout>
  );
};
