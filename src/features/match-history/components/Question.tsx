import React from "react";
import useMatchHistoryDetail from "../hooks/useMatchHistoryDetail";

const Question = () => {
  const { data } = useMatchHistoryDetail();
  return (
    <div>
      <h3 className="font-dot text-2xl font-bold mb-3">{data.questionName}</h3>
      <p className="font-dot">{data.questionContext}</p>
    </div>
  );
};

export default Question;
