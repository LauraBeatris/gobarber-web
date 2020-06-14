import React, { useCallback, useMemo, useEffect } from "react";
import { IconBaseProps } from "react-icons";
import { FiXCircle } from "react-icons/fi";

import { ToastMessageData } from "../../shared/types/toasts";
import { useToastsDispatch } from "../../contexts/toasts/ToastsContext";
import { icons, REMOVE_TOAST_TIMEOUT } from "../../constants/toastMessages";
import { Container } from "./styles";

interface ToastMessageProps {
  message: ToastMessageData;
  style: React.CSSProperties;
}

const ToastMessage: React.FC<ToastMessageProps> = ({ message, style }) => {
  const { removeToast } = useToastsDispatch();

  useEffect(() => {
    const timeToDelete = setTimeout(() => {
      removeToast(message.id);
    }, REMOVE_TOAST_TIMEOUT);

    return () => clearTimeout(timeToDelete);
  }, [message.id, removeToast]);

  const handleRemoveToastMessage = useCallback((): void => {
    removeToast(message.id);
  }, [message.id, removeToast]);

  const Icon: React.ComponentType<IconBaseProps> = useMemo(() => icons[message.type || "info"]?.icon, [message.type]);

  return (
    <Container
      style={style}
      hasDescription={!!message.description}
      type={message.type}
    >
      <Icon />

      <div>
        <strong>{message.title}</strong>
        <p>{message.description}</p>
      </div>

      <button type="button" onClick={handleRemoveToastMessage}>
        <FiXCircle />
      </button>
    </Container>
  );
};

export default ToastMessage;
