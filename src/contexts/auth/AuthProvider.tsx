import React, { useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useLocalStorage } from "@rehooks/local-storage";

import {
  USER_STORAGE_KEY,
  TOKEN_STORAGE_KEY,
} from "../../constants/localStorage";
import { useToastsDispatch } from "../toasts/ToastsContext";
import api from "../../settings/api";
import { AuthStateProvider, AuthDispatchProvider } from "./AuthContext";
import { SignInCredencials } from "./types";

const AuthContainer: React.FC = ({ children }) => {
  const [t] = useTranslation();
  const [user, setUser, deleteUser] = useLocalStorage(USER_STORAGE_KEY, null);
  const [token, setToken, deleteToken] = useLocalStorage(
    TOKEN_STORAGE_KEY,
    null,
  );
  const { addToast } = useToastsDispatch();

  const signIn = useCallback(
    async ({ email, password }: SignInCredencials): Promise<void> => {
      try {
        const response = await api.post("/sessions", { email, password });

        setUser(response?.data?.user);
        setToken(response?.data?.token);
      } catch (err) {
        addToast({
          title: t("toasts.authentication.error.title"),
          description: t("toasts.authentication.error.description"),
          type: "error",
        });
      }
    },
    [setUser, setToken, addToast, t],
  );

  const signOut = useCallback((): void => {
    deleteUser();
    deleteToken();
  }, [deleteUser, deleteToken]);

  const authState = useMemo(
    () => ({
      user,
      token,
    }),
    [token, user],
  );

  const authDispatch = useMemo(
    () => ({
      signIn,
      signOut,
    }),
    [signIn, signOut],
  );

  return (
    <AuthStateProvider value={authState}>
      <AuthDispatchProvider value={authDispatch}>
        {children}
      </AuthDispatchProvider>
    </AuthStateProvider>
  );
};

export default AuthContainer;
