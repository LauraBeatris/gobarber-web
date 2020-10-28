import { useCallback } from "react";

import api from "settings/api";

import { UseResetPasswordPayload, ResetPasswordData } from "./types";

/**
 * Returns the mutation to reset password
 */
const useResetPassword = (): UseResetPasswordPayload => {
  const resetPassword = useCallback((data: ResetPasswordData) => (
    api.patch<unknown>("/password/reset", data)
  ), []);

  return resetPassword;
};

export default useResetPassword;
