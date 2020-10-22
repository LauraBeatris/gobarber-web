export type OnClose = (payload?: Record<string, unknown>) => void

export interface ModalComponentProps<T = Record<string, unknown>> {
  hideModal: OnClose;
  componentProps?: T;
}

export type ModalContainerProps<T> = React.PropsWithChildren<T>

export interface ModalState<T = Record<string, unknown>> {
  title: string;
  isOpen: boolean;
  component?: React.FC<ModalComponentProps<T>>;
  componentProps?: T | unknown;
}

export interface ShowModalOptions<T = Record<string, unknown>> {
  title: string;
  component: React.FC<ModalComponentProps<T>>;
  componentProps?: T;
}

export interface ModalPayloadState {
  isOpen: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ModalContextPayload<T = any> = [
  showModal: (options: ShowModalOptions<T>) => void,
  hideModal: OnClose,
]
