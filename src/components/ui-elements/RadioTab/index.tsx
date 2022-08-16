import React, { ReactNode } from "react";
import styles from "./style.module.css";

interface Props {
  name: string;
  value: Array<string>;
  state: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioTab: React.FC<Props> = (props) => {
  const { name, value, state, onChange } = props;
  return (
    <>
      {value.map((item, index) => (
        <label key={index}>
          <input
            type="radio"
            name={name}
            value={item}
            checked={item === state}
            onChange={onChange}
            className="nes-radio is-dark"
          />
          <span className={`font-dot ${styles.label__span}`}>{item}</span>
        </label>
      ))}
    </>
  );
};

export default RadioTab;
