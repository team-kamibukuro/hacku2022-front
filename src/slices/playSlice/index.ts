import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { Player, PlayState, Room, User } from "./types";

const initialState: PlayState = {
  room: {
    id: "",
    name: "",
  },
  question: "",
  currentUser: {
    id: "",
    name: "",
    heart: 0,
    isMaster: false,
    finished: false,
    firewall: false,
    language: "",
    code: "",
    consoleResult: "",
    testResults: "",
  },
  players: [
    {
      id: "",
      name: "",
      heart: 0,
      isMaster: false,
      finished: false,
      firewall: false,
      language: "",
      code: "",
    },
  ],
  clock: null,
};

export const playSlice = createSlice({
  name: "play",
  initialState,
  reducers: {
    editCurrentUser(state, action: PayloadAction<User>) {
      state.currentUser = action.payload;
    },
    editRoom(state, action: PayloadAction<Room>) {
      state.room = action.payload;
    },
    editPlayerCode(state, action: PayloadAction<Player>) {},
    setClock(state, action: PayloadAction<any>) {
      state.clock = action.payload;
    },
    reset(): PlayState {
      return initialState;
    },
  },
});

export const { editCurrentUser, editRoom, setClock } = playSlice.actions;
export const selectCurrentUser = (state: RootState) => state.play.currentUser;
export const selectPlayers = (state: RootState) => state.play.players;
export const selectRoom = (state: RootState) => state.play.room;
export const selectClock = (state: RootState) => state.play.clock;

export default playSlice.reducer;
