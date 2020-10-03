import React from "react";

import Header from "components/Header";

import { AppLayoutContent } from "./styles";

const AppLayout: React.FC = ({ children }) => (
  <>
    <Header />

    <AppLayoutContent>
      {children}
    </AppLayoutContent>
  </>
);

export default AppLayout;
