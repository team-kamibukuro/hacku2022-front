import React from "react";
import Editor from "@monaco-editor/react";
import useOwnEditor from "../hooks/useOwnEditor";

const OwnEditor = () => {
  const { currentUser, handleEditorChange, handleEditorDidMount } =
    useOwnEditor();
  return (
    <Editor
      height="100%"
      theme="hc-black"
      language={currentUser.language}
      value={currentUser.code}
      onChange={handleEditorChange}
      onMount={handleEditorDidMount}
    />
  );
};

export default OwnEditor;
