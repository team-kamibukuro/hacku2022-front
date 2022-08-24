import Radio from "@/components/ui-elements/Radio";
import React from "react";
import useMatchHistoryDetail from "../hooks/useMatchHistoryDetail";

const CodeHistory = () => {
  const { data, targetIndex, formatedItems, handleChange } =
    useMatchHistoryDetail();

  return (
    <div>
      <div className="flex flex-col">
        <Radio
          name={"history"}
          state={targetIndex}
          items={formatedItems}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default CodeHistory;
