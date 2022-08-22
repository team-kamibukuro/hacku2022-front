import React, { useEffect } from "react";
import type { NextPage } from "next";
import { Auth } from "@/features/auth";
import { persistor } from "@/store";

const Home: NextPage = () => {
  // const purge = () => {
  //   persistor
  //     .purge()
  //     .then(() => {
  //       return persistor.flush();
  //     })
  //     .then(() => {
  //       persistor.pause();
  //     });
  // };

  // useEffect(() => {
  //   purge();
  // }, []);
  return (
    <div>
      <Auth />
    </div>
  );
};

export default Home;
