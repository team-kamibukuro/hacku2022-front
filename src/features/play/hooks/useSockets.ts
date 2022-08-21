import {
  editCode,
  editCurrentUser,
  editFinished,
  editHeart,
  selectCurrentUser,
  selectPlayers,
  selectQuestion,
  selectRoom,
  setDialog,
  setPlayer,
  setQuestion,
} from "@/slices/playSlice";
import { sendWebsocket, setWebsocket } from "@/slices/websocketSlice";
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
  READY_DATA,
  UPDATE_CODE_DATA,
  UPDATE_HEART_DATA,
} from "../types";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import Ghost from "@/common/icons/yurei_01.svg";
import UFO from "@/common/icons/ufo_04.svg";
import Portion from "@/common/icons/portion_purple_01.svg";

const useSockets = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const players = useSelector(selectPlayers);
  const room = useSelector(selectRoom);
  const question = useSelector(selectQuestion);
  const refFirstRef = useRef(true);

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
    const socket = new WebSocket(`ws://localhost:8099/play/${room.id}`);
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
        case Event.ATTACK:
          ATTACK(data);
          break;
        case Event.FINISHED:
          FINISHED(data);
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

  const ATTACK = (data: ATTACK_DATA) => {
    if (data.playerId === currentUser.id) {
      dispatch(editCurrentUser({ ...currentUser, code: data.code }));
    } else {
      dispatch(editCode({ id: data.playerId, code: data.code }));
    }
    switch (data.attackType) {
      case Attack.INDENT_INJECTION:
        notify(`${data.name}がインデントインジェクション攻撃を受けた!!`, Ghost);
        break;
      case Attack.COMMENTOUT_INJECTION:
        notify(
          `${data.name}がコメントアウトインジェクション攻撃を受けた!!`,
          UFO
        );
        break;
      case Attack.TBC_POISONING:
        notify(`${data.name}がTBCポイズニング攻撃を受けた!!`, Portion);
        break;
      default:
    }
  };

  const FINISHED = (data: FINISHED_DATA) => {
    dispatch(editFinished({ id: data.playerId }));
    notify(`${data.name} FINISHED!!`, "🎉");
  };

  const handleEditorChange = (
    value: string,
    event: monaco.editor.IModelContentChangedEvent
  ) => {
    dispatch(editCurrentUser({ ...currentUser, code: value }));
    dispatch(
      sendWebsocket({
        event: Event.UPDATE_CODE,
        playerId: currentUser.id,
        code: value,
      })
    );
  };

  return { currentUser, players, question, handleEditorChange };
};

export default useSockets;
