export interface loginData {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
}
export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}
