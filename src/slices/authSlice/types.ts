export interface User {
  id: string;
  name: string;
}

export interface AuthState {
  isAuthChecking: boolean;
  currentUser: User;
}

export interface LoginRequest {
  userEmail: string;
  userPassword: string;
}

export interface LoginResponse {
  status: number;
  userId: string;
  userName: string;
}

export interface RegisterRequest {
  userEmail: string;
  userPassword: string;
  userName: string;
}

export interface RegisterResponse {
  userId: string;
  userName: string;
}
