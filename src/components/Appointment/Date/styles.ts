import styled, { css } from "styled-components";

import { AppointmentDateContainerProps } from "./types";

export const AppointmentDateContainer = styled.span<AppointmentDateContainerProps>`
  color: ${({ theme }) => theme.colors.gray};
  display: flex;
  font-size: 20px;
  margin-left: auto;
  align-items: center;

  ${({ isPast }) => !!isPast && css`
    text-decoration: line-through;
  `};

  svg {
    color: ${({ theme }) => theme.colors.orange};
    margin-right: 6px;
  }
`;
