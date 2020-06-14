import React from "react";
import { ThemeProvider } from "styled-components";

import theme from "../styles/theme";
import GlobalStyle from "../styles/global";

const StylesProvider: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    {children}
  </ThemeProvider>
);

export default StylesProvider;
