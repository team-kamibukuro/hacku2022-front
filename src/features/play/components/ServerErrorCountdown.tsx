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
    return <p className="font-press text-4xl">{seconds}</p>;
  }
};

const ServerErrorCountdown = () => {
  const clockRef = useRef();
  const start = () => clockRef.current.start();
  const pause = () => clockRef.current.pause();

  useEffect(() => {
    start();
  }, []);

  return (
    <div>
      <SimpleCountdown time={20000} renderer={Renderer} ref={clockRef} />
    </div>
  );
};

export default ServerErrorCountdown;
