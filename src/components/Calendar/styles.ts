import styled, { css } from "styled-components";
import { shade } from "polished";

import arrowRight from "assets/icons/arrow-right.svg";
import arrowLeft from "assets/icons/arrow-left.svg";

export const DayPickerContainer = styled.div`
  .DayPicker {
    width: 100%;
    background: ${({ theme }) => theme.colors.blackMedium};
    border-radius: 10px;
  }

  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px;
  }

  .DayPicker-NavButton {
    color: ${({ theme }) => theme.colors.gray} !important;
  }

  .DayPicker-NavButton--prev {
    right: auto;
    left: 1.5em;
    background: url(${arrowLeft}) no-repeat center;
    margin-right: 0;
  }

  .DayPicker-NavButton--next {
    background: url(${arrowRight}) no-repeat center;
  }

  .DayPicker-Caption {
    margin-bottom: 1em;
    padding: 0 1em;
    color: ${({ theme }) => theme.colors.white};

    > div {
      text-align: center;
    }
  }

  .DayPicker-Day--selected {
    color: ${({ theme }) => theme.colors.inputs} !important;
    background: ${({ theme }) => theme.colors.orange} !important;
    border-radius: 10px;
  }

  .DayPicker-Day--disabled {
    color: ${({ theme }) => theme.colors.disabled} !important;
    cursor: not-allowed;
    background: transparent !important;
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
  .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    ${({ theme }) => css`
      background: ${shade(0.2, theme.colors.shape)};
    `}
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    color: ${({ theme }) => theme.colors.white};
    background: ${({ theme }) => theme.colors.shape};
    border-radius: 10px;
  }

  .DayPicker-Day--unavailable:not(.DayPicker-Day--outside) {
    cursor: not-allowed;

    &:hover {
      background: none !important;
    }
  }
`;
