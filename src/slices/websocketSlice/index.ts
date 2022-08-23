import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { WebsocketState } from "./types";

const initialState: WebsocketState = {
  socket: null,
  open: true,
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
      state.open && state.socket.send(JSON.stringify(action.payload));
    },
    catchError(state) {
      state.open = false;
    },
    closeWebsocket(state) {
      state.socket.close();
    },
  },
});

export const { setWebsocket, sendWebsocket, closeWebsocket, catchError } =
  websocketSlice.actions;
export const selectWebsocket = (state: RootState) => state.websocket.socket;
export const selectWebsocketOpen = (state: RootState) => state.websocket.open;

export default websocketSlice.reducer;
