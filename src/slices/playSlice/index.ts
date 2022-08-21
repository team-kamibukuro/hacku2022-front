import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import store, { RootState } from "@/store";
import {
  EditCode,
  EditFinished,
  EditHeart,
  InitUser,
  NewPlayer,
  PlayState,
  Question,
  Room,
  User,
} from "./types";
import { DialogEvent, DialogEventType } from "@/features/play/types";
import {
  fetchAsyncAuthRoom,
  fetchAsyncCreateRoom,
  fetchAsyncRunConsole,
  fetchAsyncRunTestCase,
} from "./api";
import {
  AuthRoomResponse,
  CreateRoomResponse,
  RunConsoleResponse,
  RunTestCaseResponse,
} from "./api/types";

const initialState: PlayState = {
  room: {
    id: "",
    name: "",
  },
  question: {
    id: "",
    name: "",
    context: "",
  },
  currentUser: {
    id: "",
    name: "",
    heart: 3,
    isMaster: false,
    finish: {
      finished: false,
      startTime: null,
      finishTime: null,
    },
    firewall: false,
    language: "",
    code: "",
    consoleResult: {
      status: 0,
      result: "",
    },
    testResult: {
      status: 0,
      isClearTestCases: false,
      testCaseTotal: 0,
      testCaseClearTotal: 0,
      testCases: [
        {
          testCaseId: "",
          isCompileError: false,
          compilerError: "",
          isClearTestCase: false,
        },
      ],
    },
    consoleResultValue: "",
    testResultValue: "",
  },
  players: [
    {
      id: "",
      name: "",
      heart: 3,
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
  attackIsRunning: false,
  loading: {
    terminal: false,
  },
};

export const playSlice = createSlice({
  name: "play",
  initialState,
  reducers: {
    initCurrentUser(state, action: PayloadAction<InitUser>) {
      state.currentUser = { ...initialState.currentUser };
      state.currentUser.id = action.payload.id;
      state.currentUser.name = action.payload.name;
    },
    editCurrentUser(state, action: PayloadAction<User>) {
      state.currentUser = action.payload;
    },
    editConsoleResult(state, action: PayloadAction<string>) {
      state.currentUser.consoleResult.result = action.payload;
    },
    editConsoleResultValue(state, action: PayloadAction<string>) {
      state.currentUser.consoleResultValue = action.payload;
    },
    editTestResultValue(state, action: PayloadAction<string>) {
      state.currentUser.testResultValue = action.payload;
    },
    setStartTime(state) {
      state.currentUser.finish.startTime = new Date();
    },
    setFinish(state) {
      state.currentUser.finish.finished = true;
    },
    editRoom(state, action: PayloadAction<Room>) {
      state.room = action.payload;
    },
    setQuestion(state, action: PayloadAction<Question>) {
      state.question = action.payload;
    },
    editCode(state, action: PayloadAction<EditCode>) {
      const findIndex = state.players.findIndex(
        (player) => player.id === action.payload.id
      );
      state.players[findIndex].code = action.payload.code;
    },
    editFinished(state, action: PayloadAction<EditFinished>) {
      const findIndex = state.players.findIndex(
        (player) => player.id === action.payload.id
      );
      state.players[findIndex].finished = true;
    },
    editHeart(state, action: PayloadAction<EditHeart>) {
      const findIndex = state.players.findIndex(
        (player) => player.id === action.payload.id
      );
      state.players[findIndex].heart = action.payload.heart;
    },
    setPlayer(state, action: PayloadAction<NewPlayer[]>) {
      const users = action.payload.map((player) => {
        return {
          id: player.id,
          name: player.name,
          heart: 3,
          isMaster: player.isMaster,
          finished: false,
          firewall: false,
          language: player.language,
          code: "",
        };
      });
      const players = users.filter((user) => user.id !== state.currentUser.id);
      state.players = players;
    },
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
    switchAttackIsRunning(state) {
      state.attackIsRunning = !state.attackIsRunning;
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
    builder.addCase(
      fetchAsyncRunConsole.fulfilled,
      (state, action: PayloadAction<RunConsoleResponse>) => {
        state.loading.terminal = false;
        state.currentUser.consoleResult.status = 200;
        if (action.payload.isError) {
          state.currentUser.consoleResult.result = action.payload.programError;
          state.currentUser.heart = state.currentUser.heart - 1;
        } else {
          state.currentUser.consoleResult.result = action.payload.programOutput;
        }
      }
    );
    builder.addCase(fetchAsyncRunConsole.pending, (state) => {
      state.loading.terminal = true;
    });
    builder.addCase(
      fetchAsyncRunTestCase.fulfilled,
      (state, action: PayloadAction<RunTestCaseResponse>) => {
        state.loading.terminal = false;
        state.currentUser.testResult = action.payload;
        if (action.payload.isClearTestCases) {
          state.currentUser.finish.finishTime = new Date();
        } else {
          state.currentUser.heart = state.currentUser.heart - 1;
        }
      }
    );
    builder.addCase(fetchAsyncRunTestCase.pending, (state) => {
      state.loading.terminal = true;
    });
  },
});

export const {
  initCurrentUser,
  editCurrentUser,
  editConsoleResult,
  editConsoleResultValue,
  editTestResultValue,
  setStartTime,
  setFinish,
  editRoom,
  editCode,
  editFinished,
  editHeart,
  setPlayer,
  setQuestion,
  setClock,
  setDialog,
  resetDialog,
  switchAttackIsRunning,
  reset,
} = playSlice.actions;
export const selectCurrentUser = (state: RootState) => state.play.currentUser;
export const selectPlayers = (state: RootState) => state.play.players;
export const selectRoom = (state: RootState) => state.play.room;
export const selectClock = (state: RootState) => state.play.clock;
export const selectDialog = (state: RootState) => state.play.dialog;
export const selectQuestion = (state: RootState) => state.play.question;
export const selectAttackIsRunning = (state: RootState) =>
  state.play.attackIsRunning;
export const selectLoading = (state: RootState) => state.play.loading;

export default playSlice.reducer;
