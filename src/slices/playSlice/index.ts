import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import {
  EditCode,
  EditCurrentUserLanguage,
  EditFinished,
  EditHeart,
  EditRoomMaxPlayer,
  EditRoomName,
  InitUser,
  NewPlayer,
  PlayState,
  Question,
  RankingUser,
  Room,
  SwitchFirewall,
  SwitchServerdown,
  User,
} from "./types";
import { DialogEvent, DialogEventType } from "@/features/play/types";
import {
  fetchAsyncAuthRoom,
  fetchAsyncCreateRoom,
  fetchAsyncMatching,
  fetchAsyncRunConsole,
  fetchAsyncRunTestCase,
} from "./api";
import {
  AuthRoomResponse,
  CreateRoomResponse,
  MatchingResponse,
  RunConsoleResponse,
  RunTestCaseResponse,
} from "./api/types";
import { TEMPLATE } from "@/common/constants";

const initialState: PlayState = {
  room: {
    id: "",
    name: "",
    isDemo: false,
    maxPlayer: 0,
  },
  question: {
    id: "",
    name: "",
    context: "",
  },
  currentUser: {
    type: "currentUser",
    id: "",
    name: "",
    heart: 3,
    isMaster: false,
    finish: {
      finished: false,
      startTime: 0,
      finishTime: 0,
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
      type: "player",
      id: "",
      name: "",
      heart: 3,
      isMaster: false,
      finished: false,
      firewall: false,
      serverdown: false,
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
  ranking: {
    users: [
      {
        playerId: "",
        name: "",
        time: "",
        rank: 0,
      },
    ],
  },
  loading: {
    terminal: false,
  },
  allFinished: false,
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
    editCurrentUserLanguage(
      state,
      action: PayloadAction<EditCurrentUserLanguage>
    ) {
      state.currentUser.language = action.payload.language;
      const template = TEMPLATE.find(
        (template) => template.language === action.payload.language
      );
      const defaultCode = template === undefined ? "" : template.template;
      console.log(defaultCode);
      state.currentUser.code = defaultCode;
    },
    resetHeart(state) {
      state.currentUser.heart = 3;
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
      state.currentUser.finish.startTime = Date.now();
    },
    setFinish(state) {
      state.currentUser.finish.finished = true;
    },
    editRoom(state, action: PayloadAction<Room>) {
      state.room = action.payload;
    },
    editRoomName(state, action: PayloadAction<EditRoomName>) {
      state.room.name = action.payload.name;
    },
    editRoomMaxPlayer(state, action: PayloadAction<EditRoomMaxPlayer>) {
      state.room.maxPlayer = action.payload.maxPlayer;
    },
    switchRoomDemo(state) {
      state.room.isDemo = !state.room.isDemo;
    },
    setQuestion(state, action: PayloadAction<Question>) {
      state.question = action.payload;
    },
    editCode(state, action: PayloadAction<EditCode>) {
      if (action.payload.id === state.currentUser.id) {
        state.currentUser.code = action.payload.code;
      } else {
        const findIndex = state.players.findIndex(
          (player) => player.id === action.payload.id
        );
        state.players[findIndex].code = action.payload.code;
      }
    },
    editFinished(state, action: PayloadAction<EditFinished>) {
      const findIndex = state.players.findIndex(
        (player) => player.id === action.payload.id
      );
      state.players[findIndex].finished = true;
    },
    switchServerdown(state, action: PayloadAction<SwitchServerdown>) {
      const findIndex = state.players.findIndex(
        (player) => player.id === action.payload.id
      );
      state.players[findIndex].serverdown =
        !state.players[findIndex].serverdown;
    },
    switchFirewall(state, action: PayloadAction<SwitchFirewall>) {
      if (action.payload.id === state.currentUser.id) {
        state.currentUser.firewall = !state.currentUser.firewall;
      } else {
        const findIndex = state.players.findIndex(
          (player) => player.id === action.payload.id
        );
        state.players[findIndex].firewall = !state.players[findIndex].firewall;
      }
    },
    editHeart(state, action: PayloadAction<EditHeart>) {
      if (action.payload.id === state.currentUser.id) {
        state.currentUser.heart = action.payload.heart;
      } else {
        const findIndex = state.players.findIndex(
          (player) => player.id === action.payload.id
        );
        state.players[findIndex].heart = action.payload.heart;
      }
    },
    setPlayer(state, action: PayloadAction<NewPlayer[]>) {
      const users = action.payload.map((player) => {
        const template = TEMPLATE.find(
          (template) => template.language === player.language
        );
        const defaultCode = template === undefined ? "" : template.template;
        return {
          ...state.players[0],
          id: player.id,
          name: player.name,
          isMaster: player.isMaster,
          language: player.language,
          code: defaultCode,
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
        case DialogEvent.ConnectionError:
          state.dialog.title = "Oops!!";
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
    setRanking(state, action: PayloadAction<RankingUser[]>) {
      state.ranking.users = action.payload;
    },
    switchAllFinished(state) {
      state.allFinished = !state.allFinished;
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
        state.room.isDemo = action.payload.isDemo;

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
        state.room.isDemo = action.payload.isDemo;

        window.location.replace("/play");
      }
    );
    builder.addCase(
      fetchAsyncMatching.fulfilled,
      (state, action: PayloadAction<MatchingResponse>) => {
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
          state.currentUser.finish.finishTime = Date.now();
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
  editCurrentUserLanguage,
  resetHeart,
  editConsoleResult,
  editConsoleResultValue,
  editTestResultValue,
  setStartTime,
  setFinish,
  editRoom,
  editRoomName,
  editRoomMaxPlayer,
  switchRoomDemo,
  editCode,
  editFinished,
  switchServerdown,
  switchFirewall,
  editHeart,
  setPlayer,
  setQuestion,
  setClock,
  setDialog,
  resetDialog,
  switchAttackIsRunning,
  setRanking,
  switchAllFinished,
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
export const selectRanking = (state: RootState) => state.play.ranking;
export const selectAllFinished = (state: RootState) => state.play.allFinished;

export default playSlice.reducer;
