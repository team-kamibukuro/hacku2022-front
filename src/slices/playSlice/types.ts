import { DialogEventType } from "@/features/play/types";

export interface Room {
  id: string;
  name: string;
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
}
export interface User {
  id: string;
  name: string;
  heart: number;
  isMaster: boolean;
  finish: {
    finished: boolean;
    startTime: Date | null;
    finishTime: Date | null;
  };
  firewall: boolean;
  language: string;
  code: string;
  consoleResult: ConsoleResult;
  testResult: TestResult;
  consoleResultValue: string;
  testResultValue: string;
}

export interface Player {
  id: string;
  name: string;
  heart: number;
  isMaster: boolean;
  finished: boolean;
  firewall: boolean;
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

export interface PlayState {
  room: Room;
  question: Question;
  currentUser: User;
  players: Player[];
  clock: any;
  dialog: Dialog;
  attackIsRunning: boolean;
  loading: Loading;
}

export interface EditCode {
  id: string;
  code: string;
}

export interface EditHeart {
  id: string;
  heart: number;
}

export interface InitUser {
  id: string;
  name: string;
}
