import React from "react";
import { Link } from "react-router-dom";

import Button from "components/Button";

import { Container } from "./styles";

const NotFound: React.FC = () => (
  <Container>
    <div>
      <h1>Page Not Found</h1>

      <Link to="/">
        <Button>Go back to the main page or sign in</Button>
      </Link>
    </div>
  </Container>
);

export default NotFound;
