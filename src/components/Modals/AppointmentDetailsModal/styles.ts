import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 2rem;
  position: relative;
  text-align: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.shape};
  flex-direction: column;

  > h1, > h4 {
    color: ${({ theme }) => theme.colors.white};
  }

  h4 {
    font-weight: 400;
  }

  strong {
    font-weight: 600;
  }

  h4:last-of-type {
    margin-top: 5px;
    color: ${({ theme }) => theme.colors.gray};
  }

  img {
    width: 100px;
    height: 100px;
    margin: 10px 0;
  }
`;
