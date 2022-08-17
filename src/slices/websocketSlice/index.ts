import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { WebsocketState } from "./types";

const initialState: WebsocketState = {
  socket: null,
};

export const websocketSlice = createSlice({
  name: "websocket",
  initialState,
  reducers: {
    setWebsocket(state) {
      state.socket = new WebSocket("ws://127.0.0.1:5001");

      state.socket.addEventListener("open", () => {
        console.log("connected");
      });
      state.socket.addEventListener("close", () => {
        console.log("disconnecting...");
      });
      state.socket.addEventListener("error", (err) => {
        console.log("connection error:", err);
      });
    },
    closeWebsocket(state) {
      state.socket.close();
    },
  },
});

export const { setWebsocket, closeWebsocket } = websocketSlice.actions;
export const selectWebsocket = (state: RootState) => state.websocket.socket;

export default websocketSlice.reducer;
