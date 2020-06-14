import styled, { css } from "styled-components";
import { shade } from "polished";

import RippleButton from "../../styles/components/RippleButton";

export const Container = styled(RippleButton)`
  background: ${({ theme }) => theme.colors.orange};
  border: 0;
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.darkTerciary};
  height: 56px;
  padding: 0 16px;
  font-weight: 400;
  margin-top: 16px;
  transition: background-color 200ms;
  width: 100%;

  &:hover {
    ${({ theme }) => css`
      background: ${shade(0.1, theme.colors.orange)};
    `}
  }
`;
