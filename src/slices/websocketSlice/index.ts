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
    setWebsocket(state, action: PayloadAction<WebSocket>) {
      state.socket = action.payload;

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
