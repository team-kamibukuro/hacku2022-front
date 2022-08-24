import React from "react";
import Editor from "@monaco-editor/react";

const MonacoEditor = () => {
  return (
    <Editor
      height="100%"
      theme="hc-black"
      language="javascript"
      value={"aaa"}
      onChange={() => {}}
    />
  );
};

export default MonacoEditor;
