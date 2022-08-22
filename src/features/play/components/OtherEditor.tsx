import React, { useRef } from "react";
import Editor from "@monaco-editor/react";
import UserInfo from "./UserInfo";
import { Player } from "@/slices/playSlice/types";

interface Props {
  player: Player;
}

const OtherEditor: React.FC<Props> = ({ player }) => {
  const monacoRef = useRef(null);
  const editorRef = useRef(null);
  function handleEditorDidMount(editor, monaco) {
    monacoRef.current = monaco;
    editorRef.current = editor;
    editor.updateOptions({ readOnly: true });
  }

  return (
    <div className="h-full border-solid border-white bg-editor-back border-2 px-3 pt-3 pb-1 flex flex-col">
      <div className="mb-1">
        <UserInfo
          name={player.name}
          heartbeat={player.heart}
          finished={player.finished}
          serverdown={player.serverdown}
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
