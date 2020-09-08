import React from "react";
import { uuid } from "uuidv4";

import ToastMessage from "components/ToastMessage";
import ToastsProvider from "contexts/toasts/ToastsProvider";
import { ToastMessageData } from "shared/types/toasts";

import { Container } from "./styles";

export default {
  title: "Toasts",
  component: ToastMessage,
};

const success: ToastMessageData = {
  id: uuid(),
  title: "Success message",
  description: "That's a example of description",
  type: "success",
};

const error: ToastMessageData = {
  id: uuid(),
  title: "Error message",
  description: "That's a example of description",
  type: "error",
};

const info: ToastMessageData = {
  id: uuid(),
  title: "Info message",
  description: "That's a example of description",
  type: "info",
};

const messages = {
  success,
  error,
  info,
};

export const Success: React.FC = () => (
  <Container>
    <ToastsProvider>
      <ToastMessage message={messages.success} />
    </ToastsProvider>
  </Container>
);

export const Error: React.FC = () => (
  <Container>
    <ToastsProvider>
      <ToastMessage message={messages.error} />
    </ToastsProvider>
  </Container>
);

export const Info: React.FC = () => (
  <Container>
    <ToastsProvider>
      <ToastMessage message={messages.info} />
    </ToastsProvider>
  </Container>
);

export const withoutDescription: React.FC = () => (
  <Container>
    <div className="tooltips-container">
      <ToastsProvider>
        {Object.values(messages).map(({ description: _, ...message }) => (
          <ToastMessage message={message} />
        ))}
      </ToastsProvider>
    </div>
  </Container>
);
