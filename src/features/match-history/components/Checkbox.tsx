import React from "react";

interface Props {
  value: string;
  checked: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const Checkbox: React.FC<Props> = ({ value, checked, handleChange }) => {
  return (
    <div className="flex items-center">
      <label className="-mb-1">
        <input
          type="checkbox"
          className="nes-checkbox is-dark"
          checked={checked}
          onChange={handleChange}
          value={value}
        />
        <span className=""></span>
      </label>
      <span className="font-dot">{value}</span>
    </div>
  );
};

export default Checkbox;
