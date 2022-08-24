import React from "react";
import CodeHistory from "./CodeHistory";
import Info from "./Info";
import Question from "./Question";

interface Props {
  tab: string;
}
const Content: React.FC<Props> = ({ tab }) => {
  switch (tab) {
    case "情報":
      return <Info />;
      break;
    case "問題":
      return <Question />;
      break;
    case "履歴":
      return <CodeHistory />;
      break;
    default:
      return <Info />;
  }
};

export default Content;
