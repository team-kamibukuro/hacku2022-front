import SimpleCountdown from "@/features/play/components/SimpleCountdown";
import {
  resetDialog,
  selectClock,
  selectCurrentUser,
  selectDialog,
  setStartTime,
  switchAttackIsRunning,
} from "@/slices/playSlice";
import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import useRandomAttack from "../hooks/useRandomAttack";
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

  return (
    <div>
      <SimpleCountdown
        time={5000}
        renderer={Renderer}
        ref={clockRef}
        onComplete={onComplete}
      />
    </div>
  );
};

export default StartGameCountdown;
