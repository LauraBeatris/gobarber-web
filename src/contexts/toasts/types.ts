import { ToastMessageData } from "../../shared/types/toasts";

export interface ToastsStateContextData {
  messages: ToastMessageData[];
}

export interface ToastsDispatchContextData {
  addToast: (message: Omit<ToastMessageData, "id">) => void;
  removeToast: (id: string) => void;
}

export type AddToastMessage = Omit<ToastMessageData, "id">;
