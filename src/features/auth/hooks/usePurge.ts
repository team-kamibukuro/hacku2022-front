import React, { useEffect } from "react";
import { persistor } from "@/store";

const usePurge = () => {
  const purge = () => {
    persistor
      .purge()
      .then(() => {
        return persistor.flush();
      })
      .then(() => {
        persistor.pause();
      });
  };

  useEffect(() => {
    purge();
  }, []);
  return {};
};

export default usePurge;
