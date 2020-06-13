import React, { useMemo, useCallback } from 'react';
import { useLocalStorage } from '@rehooks/local-storage';

import {
  USER_STORAGE_KEY,
  TOKEN_STORAGE_KEY,
} from '../../constants/localStorage';
import api from '../../settings/api';

import { AuthStateProvider, AuthDispatchProvider } from './AuthContext';
import { SignInCredencials } from './types';

const AuthContainer: React.FC = ({ children }) => {
  const [user, setUser, deleteUser] = useLocalStorage(USER_STORAGE_KEY, null);
  const [token, setToken, deleteToken] = useLocalStorage(
    TOKEN_STORAGE_KEY,
    null,
  );

  const signIn = useCallback(
    async ({ email, password }: SignInCredencials): Promise<void> => {
      try {
        const response = await api.post('/sessions', { email, password });

        setUser(response?.data?.user);
        setToken(response?.data?.token);
      } catch (err) {
        /* TODO - Show visual feedback of errors with toast notifications */
        console.error(err);
      }
    },
    [setUser, setToken],
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
