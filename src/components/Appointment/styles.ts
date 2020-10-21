import styled, { css } from "styled-components";
import media from "styled-media-query";

import { AppointmentContainerProps } from "./types";

export const AppointmentContainer = styled.div<AppointmentContainerProps>`
  display: flex;
  padding: 16px 24px;
  position: relative;
  align-items: center;
  background: ${({ theme }) => theme.colors.shape};
  border-radius: 10px;

  img {
    height: 80px;
    width: 80px;
    margin-right: 24px;
    border-radius: 50%;
  }

  strong {
    font-size: 24px;
  }

  strong + span {
    margin-left: 10px;
  }

  ${({ showLateralBorder }) => showLateralBorder && css`&::before {
    content: "";
    left: 0;
    width: 2px;
    height: 80%;
    position: absolute;
    background: ${({ theme }) => theme.colors.orange};
  }`}

  ${media.lessThan("medium")`
    flex-direction: column;
    align-items: flex-start;

    span {
      margin-left: unset;
      margin-top: 12px;
    }
  `}
`;
