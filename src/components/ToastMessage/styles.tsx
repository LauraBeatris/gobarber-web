import styled, { css, FlattenSimpleInterpolation } from "styled-components";
import media from "styled-media-query";
import { animated } from "react-spring";

import { ToastMessageType } from "../../shared/types/toasts";

interface ContainerProps {
  hasDescription: boolean;
  type?: ToastMessageType;
}

type ContainerThemes = {
  [key in ToastMessageType]: FlattenSimpleInterpolation;
};

const containerThemes: ContainerThemes = {
  info: css`
    background: #ebf8ff;

    &,
    svg {
      color: #3172b7;
    }
  `,
  success: css`
    background: #e6fffa;

    &,
    svg {
      color: #2e656a;
    }
  `,
  error: css`
    background: #fddede;

    &,
    svg {
      color: #c53030;
    }
  `,
};

export const Container = styled(animated.div)<ContainerProps>`
  border-radius: 10px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  position: relative;
  padding: 16px 30px 16px 16px;
  max-width: 360px;

  ${media.lessThan("medium")`
    max-width: unset;
  `}

  strong {
    padding: 0 10px;
  }

  & + div {
    margin-top: 16px;
  }

  svg {
    font-size: 20px;
  }

  > svg {
    margin: 4px 0 0 0;
  }

  ${({ type }) => containerThemes[type || "info"]}

  div {
    flex: 1;

    p {
      margin-top: 4px;
      font-size: 14px;
      opacity: 0.8;
      line-height: 20px;
    }
  }

  button {
    position: absolute;
    right: 8px;
    top: 15px;
    opacity: 0.6;
    border: none;
    background: none;

    svg {
      margin-left: 15px;
    }
  }

  ${({ hasDescription }) => !hasDescription
    && css`
      align-items: center;

      > svg {
        margin-top: 0;
      }
    `}
`;
