import styled, { css } from "styled-components";

import Tooltip from "../Tooltip";

interface ContainerProps {
  isFilled: boolean;
  isFocused: boolean;
  hasError: boolean;
}

export const Container = styled.div<ContainerProps>`
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.darkSecondary};
  border: 2px solid ${({ theme }) => theme.colors.darkSecondary};
  color: ${({ theme }) => theme.colors.whiteSecondary};
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  padding: 0 16px;
  transition: all 200ms;

  svg {
    font-size: 20px;
    margin-right: 10px;
    color: ${({ theme }) => theme.colors.gray};
  }

  & + div {
    margin-top: 8px;
  }

  ${({ isFocused, theme }) => isFocused
    && css`
      border: 2px solid ${theme.colors.orange};
    `}

  ${({ isFilled, theme }) => isFilled
    && css`
      svg {
        color: ${theme.colors.orange};
      }
    `}

  ${({ hasError, theme }) => hasError
    && css`
      border: 2px solid ${theme.colors.danger};

      svg {
        color: ${theme.colors.danger};
      }
    `}

  input {
    flex: 1;
    background: transparent;
    border: none;
    height: 100%;
    width: 100%;
    padding: 16px 0;

    &::placeholder {
      color: ${({ theme }) => theme.colors.gray};
    }

    &,
    &:-internal-autofill-selected {
      background-color: transparent !important;
      color: ${({ theme }) => theme.colors.whiteSecondary} !important;
    }

    &:-webkit-autofill,
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus {
      ${({ theme }) => css`
        -webkit-box-shadow: 0 0 0px 1000px ${theme.colors.darkSecondary} inset;
        -webkit-text-fill-color: ${theme.colors.whiteSecondary} !important;
        transition: background-color 5000s ease-in-out 0s;
      `}
    }
  }
`;

export const Error = styled(Tooltip)`
  height: 100%;

  > svg {
    color: ${({ theme }) => theme.colors.danger};
    margin: 0;
  }

  span {
    background: ${({ theme }) => theme.colors.danger};
    font-size: 14px;

    &:before {
      border-color: ${({ theme }) => theme.colors.danger} transparent;
    }
  }
`;
