import React from "react";
import Editor from "@monaco-editor/react";
import useOwnEditor from "../hooks/useOwnEditor";
import { TEMPLATE } from "@/common/constants";

const OwnEditor = () => {
  const { currentUser, handleEditorChange, handleEditorDidMount } =
    useOwnEditor();
  const template = TEMPLATE.find(
    (template) => template.language === currentUser.language
  );

  return (
    <Editor
      height="100%"
      theme="hc-black"
      language={currentUser.language}
      value={currentUser.code}
      onChange={handleEditorChange}
      onMount={handleEditorDidMount}
      defaultValue={template?.template}
    />
  );
};

export default OwnEditor;
