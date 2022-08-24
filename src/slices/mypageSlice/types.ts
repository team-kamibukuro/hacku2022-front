export interface MypageState {
  matchHistory: MatchHistory;
}

export interface MatchHistory {
  targetHistoryIndex: number;
  currentCode: string;
  beforeCode: string;
}
