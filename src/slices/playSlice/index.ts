import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { Dialog, Player, PlayState, Room, User } from "./types";
import { DialogEvent } from "@/features/play/types";

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
  dialog: {
    open: true,
    event: DialogEvent.MatchingWaiting,
    title: "Matching waiting...",
    submitTitle: "Cancel",
    button: true,
    isNomal: true,
  },
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
    setDialog(state, action: PayloadAction<Dialog>) {
      state.dialog.event = action.payload.event;
      state.dialog.open = true;
      switch (action.payload.event) {
        case DialogEvent.MatchingWaiting:
          state.dialog.title = "Matching waiting...";
          state.dialog.submitTitle = "Cancel";
          state.dialog.button = true;
          state.dialog.isNomal = true;
          break;
        case DialogEvent.StartGame:
          state.dialog.title = "Start the game!!";
          state.dialog.submitTitle = "";
          state.dialog.button = false;
          state.dialog.isNomal = false;
          break;
        case DialogEvent.ServerError:
          state.dialog.title = "500";
          state.dialog.submitTitle = "";
          state.dialog.button = false;
          state.dialog.isNomal = false;
          break;
        case DialogEvent.Finish:
          state.dialog.title = "Finish!!";
          state.dialog.submitTitle = "OK";
          state.dialog.button = true;
          state.dialog.isNomal = true;
          break;
        default:
          state.dialog.open = false;
          state.dialog.event = DialogEvent.None;
          state.dialog.title = "";
          state.dialog.submitTitle = "";
          state.dialog.button = false;
          state.dialog.isNomal = false;
      }
    },
    resetDialog(state) {
      state.dialog.open = false;
      state.dialog.event = DialogEvent.None;
      state.dialog.title = "";
      state.dialog.submitTitle = "";
      state.dialog.button = false;
      state.dialog.isNomal = false;
    },
    reset(): PlayState {
      return initialState;
    },
  },
});

export const { editCurrentUser, editRoom, setClock, setDialog, resetDialog } =
  playSlice.actions;
export const selectCurrentUser = (state: RootState) => state.play.currentUser;
export const selectPlayers = (state: RootState) => state.play.players;
export const selectRoom = (state: RootState) => state.play.room;
export const selectClock = (state: RootState) => state.play.clock;
export const selectDialog = (state: RootState) => state.play.dialog;

export default playSlice.reducer;
