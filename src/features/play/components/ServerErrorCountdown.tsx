import SimpleCountdown from "@/features/play/components/SimpleCountdown";
import React, { useEffect, useRef, useState } from "react";
import Countdown from "react-countdown";
import useServerErrorCountdown from "../hooks/useServerErrorCountdown";

interface Props {
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}
const Renderer: React.FC<Props> = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    return null;
  } else {
    return <p className="font-press text-4xl">{seconds}</p>;
  }
};

const ServerErrorCountdown = () => {
  const { data, clockRef, onComplete } = useServerErrorCountdown();

  return (
    <div>
      <Countdown
        date={data.date + data.delay}
        renderer={Renderer}
        ref={clockRef}
        onStart={(delta) => {
          if (localStorage.getItem("end_date_serverdown") == null)
            localStorage.setItem(
              "end_date_serverdown",
              JSON.stringify(data.date + data.delay)
            );
        }}
        onComplete={onComplete}
      />
    </div>
  );
};

export default ServerErrorCountdown;
