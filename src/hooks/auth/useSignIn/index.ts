import { useCallback } from "react";

import api from "settings/api";

import { UseSignInPayload, SignInData } from "./types";

/**
 * Returns the sign in mutation
 */
const useSignIn = (): UseSignInPayload => {
  const signIn = useCallback((data: SignInData) => (
    api.post<unknown>("/sessions", data)
  ), []);

  return signIn;
};

export default useSignIn;
