import React, { ChangeEventHandler, useState } from "react";

interface Item {
  value: number;
  label: string;
}
interface Props {
  items: Item[];
  handleChange: ChangeEventHandler<HTMLSelectElement>;
  label: string;
}
const SelectForm: React.FC<Props> = ({ items, handleChange, label }) => {
  let options = items.map((item, index) => (
    <option key={index} value={item.value} className="font-dot">
      {item.label}
    </option>
  ));

  return (
    <div>
      <label htmlFor="dark_select">{label}</label>
      <div className="nes-select is-dark">
        <select required id="dark_select" onChange={handleChange}>
          <option value="" disabled selected hidden>
            Select...
          </option>
          {options}
        </select>
      </div>
    </div>
  );
};

export default SelectForm;
