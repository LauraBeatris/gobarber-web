import React from "react";
import { FiLogIn } from "react-icons/fi";

import Tooltip from "components/Tooltip";

import { Container } from "./styles";

export default {
  title: "Tooltip",
  component: Tooltip,
};

export const withMessage: React.FC = () => (
  <Container>
    <div className="list">
      <p>Hover on the icon</p>
      <br />
      <Tooltip title="That's a message" icon={FiLogIn} />
    </div>
  </Container>
);
