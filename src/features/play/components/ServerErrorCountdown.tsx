import SimpleCountdown from "@/features/play/components/SimpleCountdown";
import React, { useEffect, useRef } from "react";
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
  const { clockRef, onComplete } = useServerErrorCountdown();

  return (
    <div>
      <SimpleCountdown
        time={20000}
        renderer={Renderer}
        ref={clockRef}
        onComplete={onComplete}
        autoStart={true}
      />
    </div>
  );
};

export default ServerErrorCountdown;
