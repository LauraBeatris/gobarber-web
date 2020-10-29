import { AxiosError } from "axios";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";

import { useToastsDispatch } from "contexts/toasts/ToastsContext";
import api from "settings/api";
import { User } from "shared/types/apiSchema";

import { UseSignUpPayload, SignUpData } from "./types";

const signUpMutation = (data: SignUpData): Promise<Partial<User>> => (
  api.post<Partial<User>, Partial<User>>("/users", data)
);

/**
 * Returns the sign up mutation
 */
const useSignUp = (): UseSignUpPayload => {
  const [t] = useTranslation();

  const { addToast } = useToastsDispatch();

  const [
    mutate,
    { isLoading },
  ] = useMutation<Partial<User>, AxiosError, SignUpData>(signUpMutation, {
    onSuccess: () => {
      addToast({
        title: t("toasts.signup.success.title"),
        description: t("toasts.signup.success.description"),
        type: "success",
      });
    },
  });

  const payload = useMemo<UseSignUpPayload>(() => [
    mutate,
    isLoading,
  ], [
    mutate,
    isLoading,
  ]);

  return payload;
};

export default useSignUp;
