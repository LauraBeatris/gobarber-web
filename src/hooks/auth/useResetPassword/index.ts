import { AxiosError } from "axios";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";

import { useToastsDispatch } from "contexts/toasts/ToastsContext";
import api from "settings/api";
import { User } from "shared/types/apiSchema";

import { UseResetPasswordPayload, ResetPasswordData } from "./types";

const resetPasswordMutation = (data: ResetPasswordData): Promise<User> => (
  api.patch<User, User>("/password/reset", data)
);

/**
 * Returns the mutation to reset password
 */
const useResetPassword = (): UseResetPasswordPayload => {
  const [t] = useTranslation();
  const { addToast } = useToastsDispatch();

  const [mutate, { isLoading }] = useMutation<User, AxiosError, ResetPasswordData>(
    resetPasswordMutation, {
      onSuccess: () => {
        addToast({
          title: t("toasts.reset_password_success"),
          type: "success",
        });
      },
    },
  );

  const payload = useMemo<UseResetPasswordPayload>(() => [mutate, isLoading], [
    isLoading,
    mutate,
  ]);

  return payload;
};

export default useResetPassword;
