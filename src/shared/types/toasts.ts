export type ToastMessageType = "info" | "success" | "error";

export interface ToastMessageData {
  id: string;
  title: string;
  description?: string;
  type: ToastMessageType;
}
