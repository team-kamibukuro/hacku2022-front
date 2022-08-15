import React from "react";

type InputType = "text" | "email" | "password";
interface Props {
  label: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: InputType;
  isInline?: boolean;
}
const InputForm: React.FC<Props> = ({
  label,
  handleChange,
  type = "text",
  isInline = true,
}) => {
  return (
    <div className={`nes-field ${isInline && "is-inline"}`}>
      <label htmlFor="dark_field">{label}</label>
      <input
        type={type}
        id="dark_field"
        className="nes-input is-dark"
        placeholder={label}
        onChange={handleChange}
      ></input>
    </div>
  );
};

export default InputForm;
