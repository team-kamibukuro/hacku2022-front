import React, { forwardRef, useImperativeHandle, useRef } from "react";
import Countdown, { CountdownRendererFn } from "react-countdown";

interface Props {
  time: number;
  renderer: CountdownRendererFn | undefined;
  onComplete?: () => void;
}
interface ChildHandles {
  start: () => void;
  pause: () => void;
}
const SimpleCountdown = forwardRef<ChildHandles, Props>(
  ({ time, renderer, onComplete }, ref) => {
    const clockRef = useRef();
    useImperativeHandle(ref, () => {
      return {
        start: () => clockRef.current.start(),
        pause: () => clockRef.current.pause(),
      };
    });
    return (
      <div>
        <Countdown
          date={Date.now() + time}
          renderer={renderer}
          autoStart={false}
          ref={clockRef}
          onComplete={onComplete}
        />
      </div>
    );
  }
);

export default SimpleCountdown;
