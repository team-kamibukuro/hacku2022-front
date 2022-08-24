import React from "react";
import type { NextPage } from "next";
import { Mypage as MypageComponent } from "@/features/mypage";

const Mypage: NextPage = () => {
  return (
    <div>
      <MypageComponent />
    </div>
  );
};

export default Mypage;
