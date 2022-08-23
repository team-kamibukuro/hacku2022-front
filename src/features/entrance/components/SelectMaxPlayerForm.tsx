import SelectForm from "@/components/ui-elements/SelectForm";
import React from "react";
import useMaxPlayer from "../hooks/useMaxPlayer";

const SelectMaxPlayerForm = () => {
  const { items, handleChange } = useMaxPlayer();

  return (
    <SelectForm items={items} handleChange={handleChange} label={"Players"} />
  );
};

export default SelectMaxPlayerForm;
