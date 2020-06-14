import React, { useMemo, useCallback, useState } from 'react';
import { useTransition } from 'react-spring';
import { uuid } from 'uuidv4';

import ToastsContainer from '../../styles/components/ToastsContainer';
import { ToastMessageData } from '../../shared/types/toasts';
import ToastMessage from '../../components/ToastMessage';

import { ToastsStateProvider, ToastsDispatchProvider } from './ToastsContext';

const ToastsProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessageData[]>([]);
  const messagesWithTransition = useTransition(
    messages,
    message => message.id,
    {
      from: {
        right: '-120%',
        opacity: 0,
      },
      enter: {
        right: '0%',
        opacity: 1,
      },
      leave: {
        right: '-120%',
        opacity: 0,
      },
    },
  );

  const addToast = useCallback((message): void => {
    setMessages(prevMessages => [...prevMessages, { ...message, id: uuid() }]);
  }, []);

  const removeToast = useCallback((id): void => {
    setMessages(prevMessages =>
      prevMessages.filter(message => message.id !== id),
    );
  }, []);

  const toastsState = useMemo(
    () => ({
      messages,
    }),
    [messages],
  );

  const toastsDispatch = useMemo(
    () => ({
      addToast,
      removeToast,
    }),
    [addToast, removeToast],
  );

  return (
    <ToastsStateProvider value={toastsState}>
      <ToastsDispatchProvider value={toastsDispatch}>
        <ToastsContainer>
          {messagesWithTransition.map(({ key, item, props }) => (
            <ToastMessage key={key} style={props} message={item} />
          ))}
        </ToastsContainer>
        {children}
      </ToastsDispatchProvider>
    </ToastsStateProvider>
  );
};

export default ToastsProvider;
