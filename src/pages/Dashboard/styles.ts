import styled from "styled-components";
import media from "styled-media-query";

export const Content = styled.div`
  display: flex;
  margin: auto;
  width: 100%;
  height: 100%;
  padding: 0 64px 0 0;

  max-width: ${({ theme }) => theme.lengths.contentMaxWidth}px;

  ${media.lessThan("large")`
    padding: 0 50px;
    align-items: center;
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
  justify-content: center;

  ${media.lessThan("large")`
    width: 100%;
    margin-left: unset;
    margin-bottom: 48px;
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
