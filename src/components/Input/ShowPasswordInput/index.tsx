import React, { useMemo, useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { IconContext } from "react-icons";

import Input from "components/Input";
import colors from "styles/theme/colors";
import { InputProps } from "components/Input/types";

import { Container, HidePasswordButtonContainer } from "./styles";

const ShowPasswordInput: React.FC<InputProps> = (props) => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const inputType = isPasswordHidden ? "password" : "text";

  const handleClick = (): void => {
    setIsPasswordHidden(prev => !prev);
  };

  const iconContextProviderValue = useMemo(() => ({
    color: colors.white,
  }), []);

  return (
    <Container>
      <Input {...props} type={inputType} />

      <HidePasswordButtonContainer>
        <button type="button" onClick={handleClick}>
          <IconContext.Provider value={iconContextProviderValue}>
            {
              isPasswordHidden ? (
                <AiOutlineEyeInvisible />
              ) : (
                <AiOutlineEye />
              )
            }
          </IconContext.Provider>
        </button>
      </HidePasswordButtonContainer>
    </Container>
  );
};

export default ShowPasswordInput;
