import styled from "styled-components";
import media from "styled-media-query";

export const Content = styled.div`
  display: flex;
  margin: auto;
  width: 100%;
  height: 100%;
  padding: 64px 0;

  max-width: ${({ theme }) => theme.lengths.contentMaxWidth}px;

  ${media.lessThan("large")`
    padding: 64px 32px;
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

  h4 {
    font-size: 20px;
    color: ${({ theme }) => theme.colors.gray};
  }

  div {
    display: flex;
    padding: 16px 24px;
    position: relative;
    align-items: center;
    margin-top: 24px;
    background: #3E3B47;
    border-radius: 10px;

    &::before {
      content: "";
      left: 0;
      width: 2px;
      height: 80%;
      position: absolute;
      background: ${({ theme }) => theme.colors.orange};
    }

    img {
      height: 80px;
      width: 80px;
      margin-right: 24px;
      border-radius: 50%;
    }

    strong {
      font-size: 24px;
    }

    span {
      color: ${({ theme }) => theme.colors.gray};
      font-size: 20px;
      margin-left: auto;
      display: flex;
      align-items: center;

      svg {
        color: ${({ theme }) => theme.colors.orange};
        margin-right: 6px;
      }
    }

    ${media.lessThan("medium")`
      flex-direction: column;
      align-items: flex-start;

      span {
        margin-left: unset;
        margin-top: 12px;
      }
    `}
  }
`;
