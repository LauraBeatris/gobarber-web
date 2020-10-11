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

  h4 {
    color: ${({ theme }) => theme.colors.gray};
    font-size: 20px;
    margin-bottom: 24px;
  }
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
