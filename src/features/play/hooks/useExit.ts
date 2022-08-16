import React, { useCallback } from "react";

const useExit = () => {
  const exit = useCallback(() => {
    //* NOTE: routerを使うと最適化されているため、外部jsファイルがバグを起こす。
    // router.replace("/").then(() => router.reload());
    window.location.replace("/entrance");
  }, []);

  return { exit };
};

export default useExit;
