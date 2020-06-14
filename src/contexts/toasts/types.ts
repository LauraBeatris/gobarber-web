export type ToastMessageType = 'info' | 'success' | 'error';

export interface ToastMessageData {
  id: string;
  title: string;
  description: string;
  type: ToastMessageType;
}

export interface ToastsStateContextData {
  messages: ToastMessageData[];
}

export interface ToastsDispatchContextData {
  addToast: (message: Omit<ToastMessageData, 'id'>) => void;
  removeToast: (id: string) => void;
}
