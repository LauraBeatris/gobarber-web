import { createContext, useContext } from "react";

import { ModalContextPayload } from "./types";

const ModalContext = createContext({} as ModalContextPayload<Record<string, unknown>>);

export const ModalProvider = ModalContext.Provider;

export function useModal<T = Record<string, unknown>> (): ModalContextPayload<T> {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal should be within ModalProvider");
  }

  return context;
}
