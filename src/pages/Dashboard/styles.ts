import styled from "styled-components";
import media from "styled-media-query";

export const Content = styled.div`
  display: flex;
  margin: auto;
  width: 100%;
  height: 100%;

  max-width: ${({ theme }) => theme.lengths.contentMaxWidth}px;

  ${media.lessThan("large")`
    padding: 0 50px;
    flex-direction: column-reverse;
  `}
`;

export const Schedule = styled.main`
  flex: 1;

  h1 {
    font-size: 36px;
  }

  p {
    color: ${({ theme }) => theme.colors.orange};
    display: flex;
    font-size: 1.6ch;
    margin-top: 12px;
    align-items: center;
    margin-bottom: 48px;

    span {
      display: flex;
      align-items: center;

      & + span::before {
        content: "";
        width: 0.5px;
        height: 12px;
        margin: 0 8px;
        background: ${({ theme }) => theme.colors.orange};
      }
    }
  }

  div:first-child {
    display: flex;
    align-items: center;

    button {
    border: 0;
    padding: 4px;
    height: 2rem;
    display: flex;
    border-radius: 4px;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.colors.orange};
    margin-left: 15px;

      svg {
        color: ${({ theme }) => theme.colors.white};
      }
    }
  }
`;

export const CalendarContainer = styled.aside`
  width: 20vw;
  display: flex;
  margin-left: 120px;
  justify-content: flex-end;

  ${media.lessThan("large")`
    width: 100%;
    margin-left: unset;
    margin-bottom: 48px;
    justify-content: center;
  `}
`;

export const NextAppointment = styled.div`
  margin-top: 64px;
  margin-bottom: 48px;

  > button {
    width: 100%;

    span:last-of-type {
      margin-left: auto;
    }
  }

  h4 {
    color: ${({ theme }) => theme.colors.gray};
    font-size: 20px;
    margin-bottom: 24px;
  }

  > svg {
    font-size: 20px;
  }

  ${media.lessThan("medium")`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
  `}
`;

export const BusinessClosedContainer = styled.div`
  width: 50%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  flex-direction: column;

  h1 {
    color: ${({ theme }) => theme.colors.white};
    text-align: center;
  }

  button {
    color: ${({ theme }) => theme.colors.gray};
    border: 0;
    display: flex;
    background: none;
    margin-top: 10px;
    align-items: center;
    transition: transform .5s;

    &:hover {
      transform: translateX(10px);
    }

    svg {
      margin-left: 5px;
      font-size: 20px;
    }
  }

  ${media.lessThan("large")`
    width: 100%;
  `}
`;

export const ProviderMonthAvailabilityLoadingContainer = styled.div`
  display: flex;
  min-height: 100vh;
  min-width: 100vw;
  padding-top: 40px;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;

  p {
    font-size: 20px;
    color: ${({ theme }) => theme.colors.gray};
  }

  svg {
    width: 200px !important;
    height: 200px !important;
    margin: 0 auto;
  }

  div {
    display: flex;
    width: 200px !important;
    height: 200px !important;
  }
`;
