import { User } from "shared/types/apiSchema";

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface AuthStateContextData {
  user: User;
  token: string | null;
  loading: boolean;
}

export interface AuthDispatchContextData {
  signIn: (credentials: SignInCredentials) => void;
  signOut: () => void;
}
