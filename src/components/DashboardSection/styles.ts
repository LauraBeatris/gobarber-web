import styled, { css } from "styled-components";

export const DashboardSectionContainer = styled.section`
  display: flex;
  margin-bottom: 48px;
  flex-direction: column;

  > strong {
    ${({ theme }) => css`
      color: ${theme.colors.gray};
      border-bottom: 1px solid ${theme.colors.shape};
    `};

    font-size: 20px;
    margin-bottom: 16px;
    padding-bottom: 16px;
  }

  > div {
    & + div {
      margin-top: 16px;
    }

    strong {
      font-size: 20px;
    }
  }
`;

export const DashboardSectionItem = styled.div`
  display: flex;
  width: 100%;
  align-items: center;

  > span {
    color: ${({ theme }) => theme.colors.white};
    font-size: 16px;
  }

  > div:last-child {
    flex: 1;
    margin-left: 25px;

    img {
      width: 56px;
      height: 56px;
    }
  }
`;
