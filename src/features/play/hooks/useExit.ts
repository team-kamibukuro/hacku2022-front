import useCancelButtonSound from "@/hooks/sounds/ButtonSounds/useCancelButtonSound";
import { selectCurrentUser } from "@/slices/playSlice";
import { closeWebsocket } from "@/slices/websocketSlice";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const useExit = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const [playCancelButton] = useCancelButtonSound();

  const exit = () => {
    //* NOTE: routerを使うと最適化されているため、外部jsファイルがバグを起こす。
    // router.replace("/").then(() => router.reload());
    window.location.replace("/entrance");

    dispatch(closeWebsocket({ id: currentUser.id }));
    playCancelButton();
  };

  return { exit };
};

export default useExit;
