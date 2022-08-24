import Layout from "@/components/layouts/Layout";
import StainedGlass from "@/components/layouts/StainedGlass";
import React from "react";

export const Mypage = () => {
  const name = "めいちゃん";
  return (
    <Layout>
      <StainedGlass />
      <div className="h-screen flex flex-col items-center justify-center z-50">
        <h2 className="text-white text-2xl font-press border-white border-solid border-b-4 mb-10">
          INJECTION
        </h2>
        <h3 className="text-white text-5xl font-press text-center mb-5 leading-normal">
          Mypage
        </h3>
        <div className="nes-container is-dark">
          <p className="font-dot text-xl">{name}</p>
          <p>Good morning. Thou hast had a good night's sleep, I hope.</p>
        </div>
      </div>
    </Layout>
  );
};
