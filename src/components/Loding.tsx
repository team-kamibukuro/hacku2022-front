import React from "react";
import { ClimbingBoxLoader } from "react-spinners";

const Loding = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center flex-col">
      <p className="text-white font-press mb-10">Loding now...</p>
      <ClimbingBoxLoader color={"#ffff"} loading={true} size={20} />
    </div>
  );
};

export default Loding;
