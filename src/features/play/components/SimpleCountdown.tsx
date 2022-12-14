import React, { forwardRef, useImperativeHandle, useRef } from "react";
import Countdown, { CountdownRendererFn } from "react-countdown";

interface Props {
  time: number;
  renderer: CountdownRendererFn | undefined;
  onComplete?: () => void;
  autoStart?: boolean;
}
interface ChildHandles {
  start: () => void;
  pause: () => void;
}
// eslint-disable-next-line react/display-name
const SimpleCountdown = forwardRef<ChildHandles, Props>(
  ({ time, renderer, onComplete, autoStart = false }, ref) => {
    const clockRef = useRef<any>();
    useImperativeHandle(ref, () => {
      return {
        start: () => clockRef.current?.start(),
        pause: () => clockRef.current?.pause(),
      };
    });
    return (
      <div>
        <Countdown
          date={Date.now() + time}
          renderer={renderer}
          autoStart={autoStart}
          ref={clockRef}
          onComplete={onComplete}
        />
      </div>
    );
  }
);

export default SimpleCountdown;
