import React from "react";

interface Props {
  value: string;
  checked: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const Checkbox: React.FC<Props> = ({ value, checked, handleChange }) => {
  return (
    <label>
      <input
        type="checkbox"
        className="nes-checkbox is-dark"
        checked={checked}
        onChange={handleChange}
        value={value}
      />
      <span>{value}</span>
    </label>
  );
};

export default Checkbox;
