import React from "react";

import Header from "components/Header";

const AppLayout: React.FC = ({ children }) => (
  <Header>
    {children}
  </Header>
);

export default AppLayout;
