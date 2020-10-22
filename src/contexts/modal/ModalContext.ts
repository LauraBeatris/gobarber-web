/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext } from "react";

import { ModalContextPayload } from "./types";

const ModalContext = createContext({} as ModalContextPayload<any>);

export const ModalProvider = ModalContext.Provider;

export function useModal<T = any> (): ModalContextPayload<T> {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal should be within ModalProvider");
  }

  return context;
}
