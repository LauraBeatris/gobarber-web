import { useCallback } from "react";

import api from "settings/api";

import { UseSignUpPayload, SignUpData } from "./types";

/**
 * Returns the sign up mutation
 */
const useSignUp = (): UseSignUpPayload => {
  const signUp = useCallback((data: SignUpData) => (
    api.post<unknown>("/users", data)
  ), []);

  return signUp;
};

export default useSignUp;
