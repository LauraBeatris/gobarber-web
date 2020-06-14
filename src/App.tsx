import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import AppProvider from "./contexts";
import Routes from "./routes";
import GlobalStyle from "./styles/global";
import theme from "./styles/theme";

const App: React.FC = () => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppProvider>
        <Routes />
      </AppProvider>
    </ThemeProvider>
  </BrowserRouter>
);

export default App;
