import React from "react";

import AuthProvider from "./auth/AuthProvider";
import ToastsProvider from "./toasts/ToastsProvider";
import StylesProvider from "./styles";

const AppProvider: React.FC = ({ children }) => (
  <StylesProvider>
    <ToastsProvider>
      <AuthProvider>{children}</AuthProvider>
    </ToastsProvider>
  </StylesProvider>
);

export default AppProvider;
