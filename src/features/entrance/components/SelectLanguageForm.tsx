import SelectForm from "@/components/ui-elements/SelectForm";
import React from "react";
import useLanguage from "../hooks/useLanguage";

const SelectLanguageForm = () => {
  const { items, handleChange } = useLanguage();
  return (
    <SelectForm items={items} handleChange={handleChange} label={"Language"} />
  );
};

export default SelectLanguageForm;
