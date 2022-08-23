import Checkbox from "@/components/ui-elements/Checkbox";
import React from "react";
import useDemoCheckBox from "../hooks/useDemoCheckBox";

const DemoCheckBox = () => {
  const { room, handleChange } = useDemoCheckBox();

  return (
    <Checkbox
      value={"Demo"}
      checked={room.isDemo}
      handleChange={handleChange}
    />
  );
};
export default DemoCheckBox;
