import React, { ReactNode } from "react";
import styles from "./style.module.css";

interface Item {
  value: string | number;
  label: string;
}

interface Props {
  name: string;
  items: Item[];
  state: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Radio: React.FC<Props> = (props) => {
  const { name, items, state, onChange } = props;
  return (
    <>
      {items.map((item, index) => (
        <label key={index}>
          <input
            type="radio"
            name={name}
            value={item.value}
            checked={item.value === state}
            onChange={onChange}
            className="nes-radio is-dark"
          />
          <span className={`font-dot ${styles.label__span}`}>{item.label}</span>
        </label>
      ))}
    </>
  );
};

export default Radio;
