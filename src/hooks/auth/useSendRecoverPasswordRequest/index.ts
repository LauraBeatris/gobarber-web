import { useCallback } from "react";

import api from "settings/api";

import { UseSendRecoverPasswordRequestPayload, SendRecoverPasswordRequestData } from "./types";

/**
 * Returns the mutation to send a recover password request
 */
const useSendRecoverPasswordRequest = (): UseSendRecoverPasswordRequestPayload => {
  const sendRecoverPasswordRequest = useCallback((data: SendRecoverPasswordRequestData) => (
    api.post<unknown>("/password/recover-request", data)
  ), []);

  return sendRecoverPasswordRequest;
};

export default useSendRecoverPasswordRequest;
