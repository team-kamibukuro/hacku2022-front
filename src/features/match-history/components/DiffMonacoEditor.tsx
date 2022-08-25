import React from "react";
import { DiffEditor, Monaco } from "@monaco-editor/react";
import { selectMatchHistory } from "@/slices/mypageSlice";
import { useSelector } from "react-redux";
import useMatchHistoryDetail from "../hooks/useMatchHistoryDetail";

const DiffMonacoEditor = () => {
  const matchHistory = useSelector(selectMatchHistory);
  const { data, targetIndex } = useMatchHistoryDetail();

  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    editor.updateOptions({ readOnly: true });
  };

  const beforeCode =
    targetIndex + 1 >= data.histories.length
      ? ""
      : data.histories[targetIndex + 1].code;

  return (
    <DiffEditor
      height="100%"
      theme="hc-black"
      language={data.language}
      original={beforeCode}
      modified={data.histories[targetIndex].code}
      onMount={handleEditorDidMount}
    />
  );
};

export default DiffMonacoEditor;
