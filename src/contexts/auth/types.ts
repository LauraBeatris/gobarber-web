export interface SignInCredencials {
  email: string;
  password: string;
}

export interface AuthStateContextData {
  user: Record<string, unknown> | null;
  token: string | null;
}

export interface AuthDispatchContextData {
  signIn: (credentials: SignInCredencials) => Promise<void>;
  signOut: () => void;
}
