import { useContext, createContext } from "react";

import { ToastsStateContextData, ToastsDispatchContextData } from "./types";

const ToastsStateContext = createContext<ToastsStateContextData | undefined>(
  undefined,
);
const ToastsDispatchContext = createContext<
  ToastsDispatchContextData | undefined
>(undefined);

export const ToastsStateProvider = ToastsStateContext.Provider;
export const ToastsDispatchProvider = ToastsDispatchContext.Provider;

export const useToastsState = (): ToastsStateContextData => {
  const context = useContext(ToastsStateContext);

  if (!context) {
    throw new Error("useToastsState must be within ToastProvider");
  }

  return context;
};

export const useToastsDispatch = (): ToastsDispatchContextData => {
  const context = useContext(ToastsDispatchContext);

  if (!context) {
    throw new Error("useToatsDispatch must be within ToastProvider");
  }

  return context;
};
