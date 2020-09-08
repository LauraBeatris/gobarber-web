import React, { ButtonHTMLAttributes } from "react";
import { PulseLoader } from "react-spinners";

import { handleClick } from "../../styles/components/RippleButton";
import theme from "../../styles/theme";
import { Container } from "./styles";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  loading,
  children,
  ...rest
}) => (
  <Container
    id="ripple-button"
    onClick={handleClick}
    {...rest}
  >
    {
      loading ? (
        <PulseLoader color={theme.colors.darkPrimary} size={10} />
      ) : (
        children
      )
    }
  </Container>
);

export default Button;
