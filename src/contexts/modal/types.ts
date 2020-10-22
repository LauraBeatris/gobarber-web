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
  componentProps?: ModalComponentProps["componentProps"];
}

export interface ShowModalOptions<T = Record<string, unknown>> {
  title: string;
  component: React.FC<ModalComponentProps<T>>;
  componentProps?: ModalComponentProps["componentProps"];
}

export interface ModalPayloadState {
  isOpen: boolean;
}

export type ModalContextPayload<T = Record<string, unknown>> = [
  showModal: (options: ShowModalOptions<T> | unknown) => void,
  hideModal: OnClose,
]
