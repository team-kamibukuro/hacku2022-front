import React from "react";
import type { NextPage } from "next";
import { Auth } from "@/features/auth";

const Home: NextPage = () => {
  return (
    <div>
      <Auth />
    </div>
  );
};

export default Home;
