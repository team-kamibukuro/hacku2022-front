import React from "react";
import type { NextPage } from "next";
import { MatchHistory as MatchHistoryComponent } from "@/features/match-history";

const MatchHistory: NextPage = () => {
  return (
    <div>
      <MatchHistoryComponent />
    </div>
  );
};

export default MatchHistory;
