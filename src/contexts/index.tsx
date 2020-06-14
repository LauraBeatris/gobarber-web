import React from "react";

import AuthProvider from "./auth/AuthProvider";
import ToastsProvider from "./toasts/ToastsProvider";

const AppProvider: React.FC = ({ children }) => (
  <ToastsProvider>
    <AuthProvider>{children}</AuthProvider>
  </ToastsProvider>
);

export default AppProvider;
