import SimpleCountdown from "@/features/play/components/SimpleCountdown";
import { resetDialog, selectClock, selectDialog } from "@/slices/playSlice";
import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import useRandomAttack from "../hooks/useRandomAttack";

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
  const clockRef = useRef();

  const dispatch = useDispatch();
  const clock = useSelector(selectClock);
  const dialog = useSelector(selectDialog);
  const { callAttack } = useRandomAttack();

  const start = () => clockRef.current.start();

  useEffect(() => {
    start();
  }, []);

  const onComplete = () => {
    dispatch(resetDialog());
    clock.start();
    callAttack();
  };

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
