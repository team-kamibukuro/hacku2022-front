export interface MyPageResponse {
  status: number;
  userId: string;
  userName: string;
  rankBadge: number;
  score: number;
}

export interface Error {
  status: number;
  message: string;
}
