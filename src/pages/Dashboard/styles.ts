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
    padding: 0 64px 32px 32px;
    flex-direction: column;
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

export const Calendar = styled.aside`
  margin-left: 120px;
  width: 20vw;
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
