import React, { useRef } from "react";
import Editor, { Monaco } from "@monaco-editor/react";
import UserInfo from "./UserInfo";
import { Player } from "@/slices/playSlice/types";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

interface Props {
  player: Player;
}

const OtherEditor: React.FC<Props> = ({ player }) => {
  const editorRef =
    useRef() as React.MutableRefObject<null | monaco.editor.IStandaloneCodeEditor>;

  const handleEditorDidMount = (
    editor: monaco.editor.IStandaloneCodeEditor,
    monaco: Monaco
  ) => {
    editorRef.current = editor;
    editor.updateOptions({ readOnly: true });
  };

  return (
    <div className="h-full border-solid border-white bg-editor-back border-2 px-3 pt-3 pb-1 flex flex-col">
      <div className="mb-1">
        <UserInfo
          name={player.name}
          heartbeat={player.heart}
          finished={player.finished}
          serverdown={player.serverdown}
          firewall={player.firewall}
        />
      </div>
      <div className="flex-grow">
        <Editor
          height="100%"
          theme="hc-black"
          language={player.language}
          className="mb-2"
          value={player.code}
          onMount={handleEditorDidMount}
        />
      </div>
    </div>
  );
};

export default OtherEditor;
