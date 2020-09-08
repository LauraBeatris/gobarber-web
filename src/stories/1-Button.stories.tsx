import React from "react";
import { FiLogIn, FiSend } from "react-icons/fi";

import Button from "components/Button";

import { Container } from "./styles";

export default {
  title: "Button",
  component: Button,
};

export const withText: React.FC = () => (
  <Container>
    <Button>Confirm</Button>
    <Button>Sign up</Button>
  </Container>
);

export const withIcon: React.FC = () => (
  <Container>
    <Button>
      <FiSend />
      Send
    </Button>
    <Button>
      <FiLogIn />
      {" "}
      Sign in
    </Button>
  </Container>
);
