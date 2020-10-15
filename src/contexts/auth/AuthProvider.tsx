import React, { useMemo, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useLocalStorage } from "@rehooks/local-storage";

import { USER_STORAGE_KEY, TOKEN_STORAGE_KEY, REFRESH_TOKEN_STORAGE_KEY } from "constants/localStorage";
import { useToastsDispatch } from "contexts/toasts/ToastsContext";
import api from "settings/api";
import { User } from "shared/types/apiSchema";

import { AuthStateProvider, AuthDispatchProvider } from "./AuthContext";
import { SignInCredentials } from "./types";

const AuthContainer: React.FC = ({ children }) => {
  const [t] = useTranslation();

  const [user, setUser, deleteUser] = useLocalStorage<User>(
    USER_STORAGE_KEY,
    {} as User,
  );

  const [token, setToken, deleteToken] = useLocalStorage(
    TOKEN_STORAGE_KEY,
    null,
  );

  const [, setRefreshToken, deleteRefreshToken] = useLocalStorage(
    REFRESH_TOKEN_STORAGE_KEY,
    null,
  );

  const { addToast } = useToastsDispatch();

  const [loading, setLoading] = useState(false);

  const signIn = useCallback(
    async ({ email, password }: SignInCredentials): Promise<void> => {
      setLoading(true);

      try {
        const { data } = await api.post("/sessions", {
          email,
          password,
        });

        setUser(data?.user);
        setToken(data?.token);
        setRefreshToken(data?.refreshToken);
      } catch (err) {
        addToast({
          title: t("toasts.authentication.error.title"),
          description: t("toasts.authentication.error.description"),
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    },
    [setUser, setToken, setRefreshToken, addToast, t],
  );

  const signOut = useCallback((): void => {
    deleteUser();
    deleteToken();
    deleteRefreshToken();
  }, [
    deleteUser,
    deleteToken,
    deleteRefreshToken,
  ]);

  const authState = useMemo(
    () => ({
      user,
      token,
      loading,
    }),
    [
      token,
      user,
      loading,
    ],
  );

  const authDispatch = useMemo(
    () => ({
      signIn,
      signOut,
    }),
    [
      signIn,
      signOut,
    ],
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
