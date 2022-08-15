import React from "react";

export const ButtonStyle = {
  isNomal: "bg-white",
  isPrimary: "is-primary",
  isSuccess: "is-success",
  isWarning: "is-warning",
  isError: "is-error",
  isDisabled: "is-disabled",
} as const;
type Font = "press" | "dot";
interface Props {
  buttonStyle: typeof ButtonStyle[keyof typeof ButtonStyle];
  font?: Font;
  children?: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}
const Button: React.FC<Props> = ({
  buttonStyle,
  font = "press",
  children,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      type="button"
      className={`
        nes-btn font-${font} ${disabled ? "is-disabled" : buttonStyle}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
