import React, { ReactNode } from "react";
import styles from "./style.module.css";

interface Item {
  value: string | number;
  roomName: string;
  players: Array<string>;
  datetime: string;
}

interface Props {
  name: string;
  items: Item[];
  state: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
}

const HistoryRadioList: React.FC<Props> = (props) => {
  const { name, items, state, onChange, onClick } = props;
  return (
    <div className="mt-5">
      {items.map((item, index) => (
        <label key={index} htmlFor={String(index)} className="mb-4">
          <input
            type="radio"
            name={name}
            id={String(index)}
            value={item.value}
            checked={item.value === state}
            onChange={onChange}
            className="nes-radio is-dark"
            onClick={onClick}
          />
          <span
            className={`font-dot ${styles.label__span} font-semibold text-lg`}
          >
            {`Room: ${item.roomName}`}
          </span>

          <div className="ml-5 flex flex-col">
            <span className={`font-dot ${styles.label__span}`}>
              Players:{" "}
              {item.players.map((player, index) => {
                if (index + 1 === item.players.length) {
                  return player;
                } else {
                  return player + " vs ";
                }
              })}
            </span>
            <span className={`font-dot ${styles.label__span}`}>
              {item.datetime}
            </span>
          </div>
        </label>
      ))}
    </div>
  );
};

export default HistoryRadioList;
