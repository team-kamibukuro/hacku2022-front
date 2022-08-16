import SimpleCountdown from "@/features/play/components/SimpleCountdown";
import React, { useEffect, useRef } from "react";

interface Props {
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}
const Renderer: React.FC<Props> = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    alert();
    return null;
  } else {
    return <span className="font-press">{seconds}</span>;
  }
};

const StartGameCountdown = () => {
  const clockRef = useRef();
  const start = () => clockRef.current.start();
  const pause = () => clockRef.current.pause();

  useEffect(() => {
    start();
  }, []);

  return (
    <div>
      <SimpleCountdown time={5000} renderer={Renderer} ref={clockRef} />
    </div>
  );
};

export default StartGameCountdown;
