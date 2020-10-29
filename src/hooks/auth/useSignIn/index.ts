import { AxiosError } from "axios";
import { useMemo } from "react";
import { useMutation } from "react-query";

import api from "settings/api";
import { Session } from "shared/types/apiSchema";

import { UseSignInPayload, SignInData } from "./types";

const signInMutation = (data: SignInData): Promise<Session> => (
  api.post<Session, { data: Session }>("/sessions", data)
    .then(response => response.data)
);

/**
 * Returns the sign in mutation
 */
const useSignIn = (): UseSignInPayload => {
  const [mutate, { isLoading }] = useMutation<Session, AxiosError, SignInData>(signInMutation);

  const payload = useMemo<UseSignInPayload>(() => [
    mutate,
    isLoading,
  ], [
    mutate,
    isLoading,
  ]);

  return payload;
};

export default useSignIn;
