import React, { useRef } from "react";
import Editor, { Monaco } from "@monaco-editor/react";
import { useSelector } from "react-redux";
import { selectMatchHistory } from "@/slices/mypageSlice";
import useMatchHistoryDetail from "../hooks/useMatchHistoryDetail";

const MonacoEditor = () => {
  const matchHistory = useSelector(selectMatchHistory);
  const { data } = useMatchHistoryDetail();

  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    editor.updateOptions({ readOnly: true });
  };

  return (
    <Editor
      height="100%"
      theme="hc-black"
      language={data.language}
      value={matchHistory.currentCode}
      onMount={handleEditorDidMount}
      defaultValue={data.histories[0].code}
    />
  );
};

export default MonacoEditor;
