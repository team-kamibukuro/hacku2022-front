import React from "react";
import type { NextPage } from "next";
import { MatchHistoryTop as MatchHistoryTopComponent } from "@/features/match-history";

const MatchHistoryTop: NextPage = () => {
  return (
    <div>
      <MatchHistoryTopComponent />
    </div>
  );
};

export default MatchHistoryTop;
