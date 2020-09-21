export interface User {
  name: string;
  avatar_url: string;
}

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
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
}
