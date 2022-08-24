import Layout from "@/components/layouts/Layout";
import StainedGlass from "@/components/layouts/StainedGlass";
import React from "react";
import { Avatar } from "@mui/material";
import Jewelry from "@/common/icons/jewelry/jewelry_round_purple.svg";
import Button, { ButtonStyle } from "@/components/ui-elements/Button";
import SubPage from "@/components/layouts/SubPage";

export const Mypage = () => {
  const name = "めい";
  return (
    <Layout>
      <StainedGlass />
      <SubPage title={"Mypage"}>
        <div className="w-full">
          <div className="m-auto" style={{ width: "fit-content" }}>
            <div className="nes-container is-dark text-left w-[470px]">
              <div className="flex justify-start items-start mb-6">
                <Avatar sx={{ width: 80, height: 80 }} className="mr-4" />
                <div>
                  <p className="font-dot text-xl my-3 font-medium">{name}</p>
                  <div className="flex items-center justify-center mb-2">
                    <Jewelry className="w-10 mr-2" />
                    <p className="font-dot">Purple DIAMOND</p>
                  </div>
                  <p className="font-dot">SCORE: 300</p>
                </div>
              </div>
              <div className="flex flex-col">
                <div></div>
                <Button
                  onClick={() => {}}
                  buttonStyle={ButtonStyle.isPrimary}
                  font={"press"}
                >
                  Match History
                </Button>
                <div className="my-1"></div>
                <Button
                  onClick={() => {}}
                  buttonStyle={ButtonStyle.isNomal}
                  font={"press"}
                >
                  Setting
                </Button>
                <div className="my-1"></div>
                <Button
                  onClick={() => {}}
                  buttonStyle={ButtonStyle.isNomal}
                  font={"press"}
                >
                  Gyide
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex mt-10 group text-center">
          <span className="font-press text-lg -mt-0.5 text-white hover:text-yellow-400">
            &lt;&lt; Back
          </span>
        </div>
      </SubPage>
    </Layout>
  );
};
