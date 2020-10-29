import React from "react";
import { ReactQueryDevtools } from "react-query-devtools";
import { BrowserRouter } from "react-router-dom";

import AppProvider from "./contexts";
import Routes from "./routes";

const App: React.FC = () => (
  <BrowserRouter>
    <AppProvider>
      <Routes />
      <ReactQueryDevtools initialIsOpen={false} />
    </AppProvider>
  </BrowserRouter>
);

export default App;
