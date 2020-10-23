import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.shape};

  button svg {
    color: ${({ theme }) => theme.colors.gray};
  }
`;
