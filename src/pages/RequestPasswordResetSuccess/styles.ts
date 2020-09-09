import styled from "styled-components";

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    margin-top: 30px;
  }

  h4 {
    padding: 15px 30px;
    font-weight: 400;
    text-align: center;

    span.bold {
      font-weight: 500;
      color: ${({ theme }) => theme.colors.orange};
    }

    &:last-of-type {
      margin-bottom: 40px;
    }
  }

  button {
    border: unset;
    background-color: unset;
    color: ${({ theme }) => theme.colors.orange};

    &:disabled {
      cursor: not-allowed;
    }
  }
`;
