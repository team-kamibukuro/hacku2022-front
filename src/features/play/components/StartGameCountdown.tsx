import SimpleCountdown from "@/features/play/components/SimpleCountdown";
import useStartGameCountdownSound from "@/hooks/sounds/useStartGameCountdownSound";
import React from "react";
import useStartGameCountdown from "../hooks/useStartGameCountdown";

interface Props {
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}
const Renderer: React.FC<Props> = ({ hours, minutes, seconds, completed }) => {
  if (!completed) {
    return <p className="font-press text-4xl">{seconds}</p>;
  } else {
    return <p></p>;
  }
};

const StartGameCountdown = () => {
  const { clockRef, onComplete } = useStartGameCountdown();
  useStartGameCountdownSound();
  return (
    <div>
      <SimpleCountdown
        time={3000}
        renderer={Renderer}
        ref={clockRef}
        onComplete={onComplete}
      />
    </div>
  );
};

export default StartGameCountdown;
