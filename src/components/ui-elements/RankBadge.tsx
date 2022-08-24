import React from "react";
import CrownGordRed from "@/common/icons/crown/crown_01_gold_red.svg";
import CrownGordBlue from "@/common/icons/crown/crown_02_gold_blue.svg";
import CrownSilverRed from "@/common/icons/crown/crown_03_silver_red.svg";
import CrownSilverBlue from "@/common/icons/crown/crown_04_silver_blue.svg";
import CrownBronzeRed from "@/common/icons/crown/crown_05_bronze_red.svg";
import CrownBronzeBlue from "@/common/icons/crown/crown_06_bronze_blue.svg";

interface Props {
  rank: number;
}
const RankBadge: React.FC<Props> = ({ rank }) => {
  switch (rank) {
    case 1:
      return <CrownGordRed />;
      break;
    case 1:
      return <CrownGordBlue />;
      break;
    case 3:
      return <CrownSilverRed />;
      break;
    case 4:
      return <CrownSilverBlue />;
      break;
    case 5:
      return <CrownBronzeRed />;
      break;
    case 6:
      return <CrownBronzeBlue />;
      break;
    default:
      return <CrownBronzeBlue />;
  }
};

export default RankBadge;
