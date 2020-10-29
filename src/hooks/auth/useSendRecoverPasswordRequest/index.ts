import { useMemo } from "react";
import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { useTranslation } from "react-i18next";

import api from "settings/api";
import { useToastsDispatch } from "contexts/toasts/ToastsContext";

import { UseSendRecoverPasswordRequestPayload, SendRecoverPasswordRequestData } from "./types";

const sendRecoverPasswordRequestMutation = (
  data: SendRecoverPasswordRequestData,
): Promise<unknown> => (
  api.post<unknown>("/password/recover-request", data)
);
/**
 * Returns the mutation to send a recover password request
 */
const useSendRecoverPasswordRequest = (): UseSendRecoverPasswordRequestPayload => {
  const { addToast } = useToastsDispatch();

  const [t] = useTranslation();

  const [mutate, { isLoading }] = useMutation<unknown, AxiosError, SendRecoverPasswordRequestData>(
    sendRecoverPasswordRequestMutation, {
      onSuccess: () => addToast({
        title: t("toasts.request_reset_password_success.email_sent_successfully"),
        type: "success",
      }),
    },
  );

  const payload = useMemo<UseSendRecoverPasswordRequestPayload>(() => (
    [mutate, isLoading]
  ), [
    isLoading,
    mutate,
  ]);

  return payload;
};

export default useSendRecoverPasswordRequest;
