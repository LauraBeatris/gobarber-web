import React from 'react';
import { ThemeProvider } from 'styled-components';

import AppProvider from './contexts';

import SignIn from './pages/SignIn';
import GlobalStyle from './styles/global';
import theme from './styles/theme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppProvider>
        <SignIn />
      </AppProvider>
    </ThemeProvider>
  );
};

export default App;
