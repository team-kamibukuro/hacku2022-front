export interface User {
  id: string;
  name: string;
}

export interface AuthState {
  isAuth: boolean;
  isAuthChecking: boolean;
  currentUser: User;
  isLoginView: boolean;
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
