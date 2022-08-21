import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { useState, useEffect } from "react";
import Countdown, { CountdownRendererFn, zeroPad } from "react-countdown";
import useClock from "../hooks/useClock";
import useCustomCountdown from "../hooks/useCustomCountdown";

interface Props {
  time: number;
}

const CustomCountdown: React.FC<Props> = ({ time }) => {
  const { renderer, data, onComplete } = useCustomCountdown(time);

  const { clockRef } = useClock();

  return (
    <div>
      <Countdown
        date={data.date + data.delay}
        renderer={renderer}
        autoStart={false}
        ref={clockRef}
        onStart={(delta) => {
          if (localStorage.getItem("end_date") == null)
            localStorage.setItem(
              "end_date",
              JSON.stringify(data.date + data.delay)
            );
        }}
        onComplete={onComplete}
      />
    </div>
  );
};

export default CustomCountdown;
