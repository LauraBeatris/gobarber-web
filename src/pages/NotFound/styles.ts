import styled from "styled-components";

export const Container = styled.main`
  height: 100vh;

  &, div {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }

  h1 {
    font-size: 36px;
  }
`;
