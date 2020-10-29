import React, { useMemo, useCallback } from "react";
import { useLocalStorage } from "@rehooks/local-storage";
import noop from "lodash.noop";

import { USER_STORAGE_KEY, TOKEN_STORAGE_KEY, REFRESH_TOKEN_STORAGE_KEY } from "constants/localStorage";
import { User } from "shared/types/apiSchema";
import useSignIn from "hooks/auth/useSignIn";

import { AuthStateProvider, AuthDispatchProvider } from "./AuthContext";
import { SignInCredentials } from "./types";

const AuthContainer: React.FC = ({ children }) => {
  const [signIn, loading] = useSignIn();

  const [user, setUser, deleteUser] = useLocalStorage<User>(
    USER_STORAGE_KEY,
    {} as User,
  );

  const [token, setToken, deleteToken] = useLocalStorage(
    TOKEN_STORAGE_KEY,
    "",
  );

  const [, setRefreshToken, deleteRefreshToken] = useLocalStorage(
    REFRESH_TOKEN_STORAGE_KEY,
    "",
  );

  const handleSignIn = useCallback(
    ({ email, password }: SignInCredentials): void => {
      signIn({
        email,
        password,
      })
        .then((data) => {
          if (
            !data?.user
          || !data?.token
          || !data?.refreshToken
          ) {
            return;
          }

          setUser(data.user);
          setToken(data.token);
          setRefreshToken(data.refreshToken);
        })
        .catch(noop);
    },
    [
      signIn,
      setUser,
      setToken,
      setRefreshToken,
    ],
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
      signIn: handleSignIn,
      signOut,
    }),
    [
      handleSignIn,
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
