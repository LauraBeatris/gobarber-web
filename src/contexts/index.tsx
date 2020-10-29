import React from "react";
import { Route } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";

import AuthProvider from "./auth/AuthProvider";
import ToastsProvider from "./toasts/ToastsProvider";
import StylesProvider from "./styles";
import ModalContainer from "./modal/ModalContainer";
import ReactQueryProvider from "./reactQuery";

const AppProvider: React.FC = ({ children }) => (
  <StylesProvider>
    <ToastsProvider>
      <ReactQueryProvider>
        <QueryParamProvider ReactRouterRoute={Route}>
          <AuthProvider>
            <ModalContainer>
              {children}
            </ModalContainer>
          </AuthProvider>
        </QueryParamProvider>
      </ReactQueryProvider>
    </ToastsProvider>
  </StylesProvider>
);

export default AppProvider;
