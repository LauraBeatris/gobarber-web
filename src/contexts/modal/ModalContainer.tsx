import React, { useCallback, useMemo, useState } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

import { ModalProvider } from "./ModalContext";
import {
  ModalState,
  ShowModalOptions,
  ModalContainerProps,
  ModalContextPayload,
} from "./types";

const defaultState = {
  title: "",
  isOpen: false,
  component: undefined,
  componentProps: {},
};

function ModalContainer<T>({
  children,
}: ModalContainerProps<T>): JSX.Element {
  const [modalState, setModalState] = useState<ModalState<T>>(defaultState);

  const showModal = useCallback((options: ShowModalOptions<T>) => {
    const newState = {
      ...defaultState,
      ...options,
      isOpen: true,
    };

    setModalState(newState);
  }, []);

  const hideModal = useCallback(() => {
    setModalState(defaultState);
  }, []);

  const payload = useMemo<ModalContextPayload<T>>(() => [
    showModal,
    hideModal,
  ], [
    showModal,
    hideModal,
  ]);

  const Component = modalState?.component;
  const componentProps = (modalState?.componentProps || {}) as T;

  return (
    <ModalProvider value={payload}>
      <Modal open={modalState.isOpen} onClose={hideModal} center>
        {
          Component && (
            <Component
              hideModal={hideModal}
              componentProps={componentProps}
            />
          )
        }
      </Modal>

      {children}
    </ModalProvider>
  );
}

export default ModalContainer;
