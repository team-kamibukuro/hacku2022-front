import { DialogEventType } from "@/features/play/types";

export interface Room {
  id: string;
  name: string;
  isDemo: boolean;
  maxPlayer: number;
}

export interface TestCase {
  testCaseId: string;
  isCompileError: boolean;
  compilerError: string;
  isClearTestCase: boolean;
}
export interface TestResult {
  status: number;
  isClearTestCases: boolean;
  testCaseTotal: number;
  testCaseClearTotal: number;
  testCases: TestCase[];
}
export interface ConsoleResult {
  status: number;
  result: string;
  isCompileError: boolean;
}
export interface Finish {
  finished: boolean;
  startTime: number;
  finishTime: number;
}
export interface User {
  type: "currentUser";
  id: string;
  name: string;
  heart: number;
  isMaster: boolean;
  finish: Finish;
  firewall: boolean;
  language: string;
  code: string;
  consoleResult: ConsoleResult;
  testResult: TestResult;
  consoleResultValue: string;
  testResultValue: string;
}

export interface Player {
  type: "player";
  id: string;
  name: string;
  heart: number;
  isMaster: boolean;
  finished: boolean;
  firewall: boolean;
  serverdown: boolean;
  language: string;
  code: string;
}

export interface NewPlayer {
  id: string;
  name: string;
  isMaster: boolean;
  language: string;
}

export interface Dialog {
  open: boolean;
  event: DialogEventType;
  title: string;
  submitTitle: string;
  button: boolean;
  isNomal: boolean;
}

export interface Question {
  id: string;
  name: string;
  context: string;
}

export interface Loading {
  terminal: boolean;
}

export interface RankingUser {
  playerId: string;
  name: string;
  time: string;
  rank: number;
}

export interface Ranking {
  users: RankingUser[];
}

export interface PlayState {
  room: Room;
  question: Question;
  currentUser: User;
  players: Player[];
  clock: any;
  dialog: Dialog;
  attackIsRunning: boolean;
  loading: Loading;
  ranking: Ranking;
  allFinished: boolean;
}

export interface EditCode {
  id: string;
  code: string;
}

export interface EditHeart {
  id: string;
  heart: number;
}

export interface EditFinished {
  id: string;
}

export interface SwitchServerdown {
  id: string;
}

export interface SwitchFirewall {
  id: string;
}

export interface InitUser {
  id: string;
  name: string;
}

export interface EditRoomName {
  name: string;
}

export interface EditRoomMaxPlayer {
  maxPlayer: number;
}

export interface EditCurrentUserLanguage {
  language: string;
}
