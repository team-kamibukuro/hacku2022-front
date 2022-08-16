import React, { useCallback, useEffect, useRef, useState } from "react";

const useCustomCountdown = (time) => {
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      return null;
    } else {
      return (
        <span className="font-dot">
          {hours}:{minutes}:{seconds}
        </span>
      );
    }
  };

  const [data, setData] = useState({ date: Date.now(), delay: time });

  const wantedDelay = 60000;

  const getLocalStorageValue = (s: string) => localStorage.getItem(s);

  useEffect(() => {
    const savedDate: any = getLocalStorageValue("end_date");
    if (savedDate != null && !isNaN(savedDate)) {
      const currentTime = Date.now();
      const delta = parseInt(savedDate, 10) - currentTime;

      if (delta > wantedDelay) {
        if (
          getLocalStorageValue("end_date") !== null &&
          getLocalStorageValue("end_date")!.length > 0
        )
          localStorage.removeItem("end_date");
      } else {
        setData({ date: currentTime, delay: delta });
      }
    }
  }, []);

  return { renderer, data };
};

export default useCustomCountdown;
