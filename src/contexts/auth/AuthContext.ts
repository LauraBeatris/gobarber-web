import { useContext, createContext } from 'react';

import { AuthStateContextData, AuthDispatchContextData } from './types';

export const AuthStateContext = createContext<AuthStateContextData | undefined>(
  undefined,
);
export const AuthDispatchContext = createContext<
  AuthDispatchContextData | undefined
>(undefined);

export const AuthStateProvider = AuthStateContext.Provider;
export const AuthDispatchProvider = AuthDispatchContext.Provider;

export const useAuthState = (): AuthStateContextData => {
  const context = useContext(AuthStateContext);

  if (!context) {
    throw new Error('useAuthState must be used within a AuthProvider');
  }

  return context;
};

export const useAuthDispatch = (): AuthDispatchContextData => {
  const context = useContext(AuthDispatchContext);

  if (!context) {
    throw new Error('useAuthDispatch must be used within a AuthProvider');
  }

  return context;
};
