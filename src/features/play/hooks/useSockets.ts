import {
  editCode,
  editFinished,
  editHeart,
  selectAllFinished,
  selectClock,
  selectCurrentUser,
  selectPlayers,
  selectQuestion,
  selectRoom,
  setDialog,
  setFinish,
  setPlayer,
  setQuestion,
  setRanking,
  switchAllFinished,
  switchFirewall,
  switchServerdown,
} from "@/slices/playSlice";
import {
  catchError,
  sendWebsocket,
  setWebsocket,
} from "@/slices/websocketSlice";
import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  Attack,
  ATTACK_DATA,
  DialogEvent,
  Event,
  FINISHED_DATA,
  ALL_FINISHED_DATA,
  READY_DATA,
  UPDATE_CODE_DATA,
  UPDATE_HEART_DATA,
  RANKING_DATA,
  SERVER_ERROR_DATA,
  RANSOMWARE_DATA,
  FIREWALL_DATA,
} from "../types";
import Ghost from "@/common/icons/yurei_01.svg";
import UFO from "@/common/icons/ufo_04.svg";
import Portion from "@/common/icons/portion_purple_01.svg";
import BrokenHeart from "@/common/icons/mark_heart_broken_red.svg";
import Shield from "@/common/icons/shield_red.svg";
import Utyujin from "@/common/icons/grey_purple.svg";
import useDamageSound from "@/hooks/sounds/SoundEffects/useDamageSound";
import useGetItemSound from "@/hooks/sounds/SoundEffects/useGetItemSound";
import useGuardSound from "@/hooks/sounds/SoundEffects/useGuardSound";
import twemoji from "twemoji";

const useSockets = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const players = useSelector(selectPlayers);
  const room = useSelector(selectRoom);
  const question = useSelector(selectQuestion);
  const allFinished = useSelector(selectAllFinished);
  const refFirstRef = useRef(true);
  const sendAllFinishedRef = useRef(true);
  const clock = useSelector(selectClock);
  const damagedRef = useRef(false);
  const guardRef = useRef(false);
  const getItemRef = useRef(false);
  const [playDamage] = useDamageSound();
  const [playGetItem] = useGetItemSound();
  const [playGuard] = useGuardSound();

  const notify = (message: string, icon: any) =>
    toast.dark(message, {
      icon: icon,
    });

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      if (refFirstRef.current) {
        refFirstRef.current = false;
        return;
      }
    }

    console.log("Connectinng..");
    const socket = new WebSocket(
      process.env.NEXT_PUBLIC_WEBSOCKET_URL + room.id
    );
    dispatch(setWebsocket(socket));
    socket.onopen = () =>
      socket.send(
        JSON.stringify({
          event: Event.CONNECT_SUCCESS,
          playerId: currentUser.id,
          name: currentUser.name,
          language: currentUser.language,
        })
      );
    socket.addEventListener("close", () => {
      console.log("disconnecting...");
      dispatch(catchError());
    });
    socket.addEventListener("error", (err) => {
      console.log("connection error:", err);
      dispatch(catchError());
    });
    socket.addEventListener("message", function (e) {
      const data = JSON.parse(e.data);
      console.log("Message from server ", data);
      console.log(data.event);

      switch (data.event) {
        case Event.READY:
          READY(data);
          break;
        case Event.UPDATE_CODE:
          UPDATE_CODE(data);
          break;
        case Event.UPDATE_HEART:
          UPDATE_HEART(data);
          break;
        case Event.SERVER_ERROR:
          SERVER_ERROR(data);
          break;
        case Event.ATTACK:
          ATTACK(data);
          break;
        case Event.FIREWALL:
          FIREWALL(data);
          break;
        case Event.FINISHED:
          FINISHED(data);
          break;
        case Event.ALL_FINISHED:
          ALL_FINISHED(data);
          break;
        case Event.RANKING:
          RANKING(data);
          break;
        default:
      }
    });
  }, []);

  const READY = (data: READY_DATA) => {
    dispatch(
      setQuestion({
        id: data.question.id,
        name: data.question.name,
        context: data.question.context,
      })
    );
    dispatch(setPlayer(data.players));
    dispatch(setDialog(DialogEvent.StartGame));
  };

  const UPDATE_CODE = (data: UPDATE_CODE_DATA) => {
    dispatch(editCode({ id: data.playerId, code: data.code }));
  };

  const UPDATE_HEART = (data: UPDATE_HEART_DATA) => {
    dispatch(editHeart({ id: data.playerId, heart: data.heart }));
  };

  const SERVER_ERROR = (data: SERVER_ERROR_DATA) => {
    dispatch(switchServerdown({ id: data.playerId }));
    if (data.status) {
      notify(`${data.name}?????????????????????????????????!!`, Utyujin);
    }
  };

  const ATTACK = (data: ATTACK_DATA | RANSOMWARE_DATA) => {
    if (data.attackType === "RANSOMWARE") {
      notify(`${data.name}??????????????????????????????????????????!!`, BrokenHeart);
      if (data.firewall) {
        if (data.playerId === currentUser.id) {
          guardRef.current = true;
        }
        notify(`${data.name}?????????????????????????????????????????????????????????!!`, Shield);
      } else {
        if (data.playerId === currentUser.id) {
          damagedRef.current = true;
        }
        dispatch(editHeart({ id: data.playerId, heart: data.heart }));
      }
    } else {
      switch (data.attackType) {
        case Attack.INDENT_INJECTION:
          notify(
            `${data.name}????????????????????????????????????????????????????????????!!`,
            Ghost
          );
          break;
        case Attack.COMMENTOUT_INJECTION:
          notify(
            `${data.name}??????????????????????????????????????????????????????????????????!!`,
            UFO
          );
          break;
        case Attack.TBC_POISONING:
          notify(`${data.name}???TBC????????????????????????????????????!!`, Portion);
          break;
        default:
      }
      if (data.firewall) {
        if (data.playerId === currentUser.id) {
          guardRef.current = true;
        }
        notify(`${data.name}?????????????????????????????????????????????????????????!!`, Shield);
      } else {
        if (data.playerId === currentUser.id) {
          damagedRef.current = true;
        }
        dispatch(editCode({ id: data.playerId, code: data.code }));
      }
    }
  };

  const FIREWALL = (data: FIREWALL_DATA) => {
    dispatch(switchFirewall({ id: data.playerId }));
    if (data.status) {
      notify(`${data.name} ?????????????????????????????????Get??????`, Shield);

      if (data.playerId === currentUser.id) {
        getItemRef.current = true;
      }
    }
  };

  const FINISHED = (data: FINISHED_DATA) => {
    dispatch(editFinished({ id: data.playerId }));
    toast.dark(`${data.name} Finished!!`);
  };

  const ALL_FINISHED = (data: ALL_FINISHED_DATA) => {
    dispatch(switchAllFinished());
  };

  const RANKING = (data: RANKING_DATA) => {
    dispatch(setRanking(data.users));
    dispatch(setDialog(DialogEvent.Finish));
  };

  if (allFinished && sendAllFinishedRef.current) {
    let diff = 0;
    if (currentUser.finish.finished) {
      diff = currentUser.finish.finishTime - currentUser.finish.startTime;
      clock.pause();
    } else {
      dispatch(setFinish());
      diff = Date.now() - currentUser.finish.startTime;
    }
    dispatch(
      sendWebsocket({
        event: Event.ALL_FINISHED,
        playerId: currentUser.id,
        name: currentUser.name,
        time: diff.toString(),
      })
    );
    sendAllFinishedRef.current = false;
  }

  if (damagedRef.current) {
    damagedRef.current = false;
    playDamage();
  }

  if (getItemRef.current) {
    getItemRef.current = false;
    playGetItem();
  }

  if (guardRef.current) {
    guardRef.current = false;
    playGuard();
  }

  return { currentUser, players, question };
};

export default useSockets;
