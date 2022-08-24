export interface GameResult {
  userName: string;
  scoreTime: string;
  rankBadge: number;
  ranking: number;
}

export interface History {
  historyId: string;
  debugTime: string;
  code: string;
  isExecuteTest: boolean;
  isProgramError: boolean;
  programOutput: string;
  programError: string;
  isClearTestCases: boolean;
  testCaseTotal: number;
  testCaseClearTotal: number;
}

export interface MatchHistoryDetailResponse {
  status: number;
  userId: string;
  userName: string;
  startTime: string;
  questionId: string;
  questionName: string;
  questionContext: string;
  language: string;
  gameResult: GameResult[];
  histories: History[];
}

export interface Error {
  status: number;
  message: string;
}