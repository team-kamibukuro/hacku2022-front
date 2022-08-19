import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import store, { RootState } from "@/store";
import { Dialog, Player, PlayState, Room, User } from "./types";
import { DialogEvent, DialogEventType } from "@/features/play/types";
import { fetchAsyncAuthRoom, fetchAsyncCreateRoom } from "./api";
import { AuthRoomResponse, CreateRoomResponse } from "./api/types";

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
    setDialog(state, action: PayloadAction<DialogEventType>) {
      state.dialog.event = action.payload;
      state.dialog.open = true;
      switch (action.payload) {
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
      return {
        ...initialState,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchAsyncCreateRoom.fulfilled,
      (state, action: PayloadAction<CreateRoomResponse>) => {
        state.currentUser.isMaster = true;
        state.room.id = action.payload.id;
        state.room.name = action.payload.roomName;

        window.location.replace("/play");
      }
    );
    builder.addCase(
      fetchAsyncAuthRoom.fulfilled,
      (state, action: PayloadAction<AuthRoomResponse>) => {
        state.room.id = action.payload.roomId;
        state.room.name = action.payload.roomName;
        state.currentUser.isMaster =
          state.currentUser.id === action.payload.masterUserId;

        window.location.replace("/play");
      }
    );
  },
});

export const {
  editCurrentUser,
  editRoom,
  setClock,
  setDialog,
  resetDialog,
  reset,
} = playSlice.actions;
export const selectCurrentUser = (state: RootState) => state.play.currentUser;
export const selectPlayers = (state: RootState) => state.play.players;
export const selectRoom = (state: RootState) => state.play.room;
export const selectClock = (state: RootState) => state.play.clock;
export const selectDialog = (state: RootState) => state.play.dialog;
export const selectQuestion = (state: RootState) => state.play.question;

export default playSlice.reducer;
