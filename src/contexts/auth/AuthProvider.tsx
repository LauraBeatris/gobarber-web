import React, { useState, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useLocalStorage } from "@rehooks/local-storage";

import { USER_STORAGE_KEY, TOKEN_STORAGE_KEY } from "constants/localStorage";
import { useToastsDispatch } from "contexts/toasts/ToastsContext";
import api from "settings/api";

import { AuthStateProvider, AuthDispatchProvider } from "./AuthContext";
import { SignInCredentials, User } from "./types";

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

  const { addToast } = useToastsDispatch();

  const [loading, setLoading] = useState(false);

  const signIn = useCallback(
    async ({ email, password }: SignInCredentials): Promise<void> => {
      setLoading(true);

      try {
        const response = await api.post("/sessions", {
          email,
          password,
        });

        setUser(response?.data?.user);
        setToken(response?.data?.token);
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
    [
      setUser,
      setToken,
      addToast,
      t,
    ],
  );

  const signOut = useCallback((): void => {
    deleteUser();
    deleteToken();
  }, [
    deleteUser,
    deleteToken,
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
