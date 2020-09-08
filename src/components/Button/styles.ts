import styled, { css } from "styled-components";
import { shade } from "polished";

import RippleButton from "styles/components/RippleButton";

export const Container = styled(RippleButton)`
  background: ${({ theme }) => theme.colors.orange};
  border: 0;
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.darkTertiary};
  height: 56px;
  padding: 0 16px;
  font-weight: 400;
  margin-top: 16px;
  transition: background-color 200ms;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ disabled }) => disabled && css`
    opacity: 0.5;
    cursor: not-allowed;
  `}

  svg {
    margin-right: 8px;
  }

  &:hover {
    ${({ theme }) => css`
      background: ${shade(0.1, theme.colors.orange)};
    `}
  }
`;
