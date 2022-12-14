export interface CreateRoomRequest {
  masterUserId: string;
  roomName: string;
  isDemo: boolean;
  maxPlayer: number;
}

export interface CreateRoomResponse {
  id: string;
  masterUserId: string;
  roomName: string;
  isDemo: boolean;
}

export interface AuthRoomRequest {
  roomName: string;
}

export interface AuthRoomResponse {
  roomId: string;
  roomName: string;
  masterUserId: string;
  isDemo: boolean;
}

export interface MatchingRequest {
  userId: string;
}

export interface MatchingResponse {
  roomId: string;
  roomName: string;
  masterUserId: string;
}

export interface RunConsoleRequest {
  code: string;
  language: string;
  questionId: string;
  roomId: string;
  userId: string;
}
export interface RunConsoleResponse {
  isError: boolean;
  programError: string;
  programOutput: string;
}

export interface RunTestCaseRequest {
  code: string;
  testId: string;
  language: string;
  roomId: string;
  userId: string;
}

export interface TestCase {
  testCaseId: string;
  isCompileError: boolean;
  compilerError: string;
  isClearTestCase: boolean;
}
export interface RunTestCaseResponse {
  status: number;
  questionId: string;
  isClearTestCases: boolean;
  testCaseTotal: number;
  testCaseClearTotal: number;
  testCases: TestCase[];
}
