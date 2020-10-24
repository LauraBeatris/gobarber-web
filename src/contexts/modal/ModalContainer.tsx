import React, {
  useCallback,
  useState,
  useMemo,
  useRef,
} from "react";
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
  const containerRef = useRef<HTMLDivElement | null>(null);
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

  const modalClassNames = useMemo(() => ({
    modal: "customModal",
  }), []);

  const Component = modalState?.component;
  const componentProps = (modalState?.componentProps || {}) as T;

  return (
    <div style={{ width: "100vw", height: "100vh" }} ref={containerRef}>
      <ModalProvider value={payload}>
        <Modal
          open={modalState.isOpen}
          center
          onClose={hideModal}
          container={containerRef.current as Element}
          classNames={modalClassNames}
        >
          {
            Component && (
              <Component
                title={modalState.title}
                hideModal={hideModal}
                componentProps={componentProps}
              />
            )
          }
        </Modal>

        {children}
      </ModalProvider>
    </div>
  );
}

export default ModalContainer;
