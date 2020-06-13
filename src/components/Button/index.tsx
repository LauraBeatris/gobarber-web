import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';
import { handleClick } from '../../styles/components/RippleButton';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <Container id="ripple-button" onClick={handleClick} {...rest}>
    {children}
  </Container>
);

export default Button;
