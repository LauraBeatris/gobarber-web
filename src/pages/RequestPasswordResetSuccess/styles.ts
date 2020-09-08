import styled from "styled-components";
import media from "styled-media-query";

import { appearFromLeft } from "styles/animations";

export const AnimationContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  ${media.greaterThan("medium")`
    animation-name: ${appearFromLeft};
    animation-duration: 500ms;
  `}

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

  button {
    border: unset;
    background-color: unset;
    color: ${({ theme }) => theme.colors.orange};

    &:disabled {
      cursor: not-allowed;
    }
  }
`;
