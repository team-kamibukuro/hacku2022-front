export interface User {
  id: string;
  name: string;
}

export interface AuthState {
  isAuthChecking: boolean;
  currentUser: User;
}
