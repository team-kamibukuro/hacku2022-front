import { editCode, selectCurrentUser } from "@/slices/playSlice";
import { sendWebsocket } from "@/slices/websocketSlice";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Event } from "../types";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

const useOwnEditor = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const monacoRef = useRef(null);
  const editorRef = useRef(null);

  useEffect(() => {
    if (currentUser.finish.finished) {
      editorRef.current?.updateOptions({ readOnly: true });
    }
  }, [currentUser.finish.finished]);

  const handleEditorDidMount = (editor, monaco) => {
    monacoRef.current = monaco;
    editorRef.current = editor;
  };

  const handleEditorChange = (
    value: string,
    event: monaco.editor.IModelContentChangedEvent
  ) => {
    if (currentUser.finish.finished) return;

    dispatch(editCode({ id: currentUser.id, code: value }));
    dispatch(
      sendWebsocket({
        event: Event.UPDATE_CODE,
        playerId: currentUser.id,
        code: value,
      })
    );
  };

  return { currentUser, handleEditorChange, handleEditorDidMount };
};

export default useOwnEditor;
