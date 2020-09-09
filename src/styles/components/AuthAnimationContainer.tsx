import styled, { Keyframes } from "styled-components";

export interface AuthAnimationContainerProps {
  animation: Keyframes;
}

const AuthAnimationContainer = styled.div<AuthAnimationContainerProps>`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  animation-name: ${({ animation }) => animation};
  animation-duration: 500ms;

  h1 {
    margin-top: 30px;
  }

  h4 {
    padding: 15px 30px;
    font-weight: 400;
    text-align: center;

    span.bold {
      font-weight: 500;
      color: ${({ theme }) => theme.colors.orange};
    }

    &:last-of-type {
      margin-bottom: 40px;
    }
  }
`;

export default AuthAnimationContainer;
