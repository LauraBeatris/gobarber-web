import React, { ButtonHTMLAttributes } from "react";

import { handleClick } from "../../styles/components/RippleButton";
import { Container } from "./styles";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <Container
    id="ripple-button"
    onClick={handleClick}
    {...rest}
  >
    {children}
  </Container>
);

export default Button;
