import React from 'react';
import { ThemeProvider } from 'styled-components';

import SignIn from './pages/SignIn';
import GlobalStyle from './styles/global';
import theme from './styles/theme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <SignIn />
    </ThemeProvider>
  )
};

export default App;
