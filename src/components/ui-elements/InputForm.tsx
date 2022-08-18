import React from "react";

type InputType = "text" | "email" | "password";
interface Props {
  label: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: InputType;
  isInline?: boolean;
  value: string;
}
const InputForm: React.FC<Props> = ({
  label,
  handleChange,
  type = "text",
  isInline = true,
  value,
}) => {
  return (
    <div className={`nes-field ${isInline && "is-inline"}`}>
      <label htmlFor={label}>{label}</label>
      <input
        value={value}
        name={label}
        type={type}
        id={label}
        className="nes-input is-dark"
        placeholder={label}
        onChange={handleChange}
      ></input>
    </div>
  );
};

export default InputForm;
