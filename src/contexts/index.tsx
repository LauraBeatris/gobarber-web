import React from "react";
import { Route } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";

import AuthProvider from "./auth/AuthProvider";
import ToastsProvider from "./toasts/ToastsProvider";
import StylesProvider from "./styles";

const AppProvider: React.FC = ({ children }) => (
  <StylesProvider>
    <ToastsProvider>
      <QueryParamProvider ReactRouterRoute={Route}>
        <AuthProvider>{children}</AuthProvider>
      </QueryParamProvider>
    </ToastsProvider>
  </StylesProvider>
);

export default AppProvider;
