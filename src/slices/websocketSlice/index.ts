import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { WebsocketState } from "./types";

const initialState: WebsocketState = {
  socket: null,
  abend: false,
  normalend: false,
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
    },
    sendWebsocket(state, action: PayloadAction<Object>) {
      !state.abend &&
        !state.normalend &&
        state.socket.send(JSON.stringify(action.payload));
    },
    catchError(state) {
      state.abend = true;
    },
    closeWebsocket(state) {
      state.socket.close();
      state.normalend = true;
    },
  },
});

export const { setWebsocket, sendWebsocket, closeWebsocket, catchError } =
  websocketSlice.actions;
export const selectWebsocket = (state: RootState) => state.websocket.socket;
export const selectWebsocketAbend = (state: RootState) => state.websocket.abend;
export const selectWebsocketNormalend = (state: RootState) =>
  state.websocket.normalend;

export default websocketSlice.reducer;
