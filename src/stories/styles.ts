import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  flex-wrap: wrap;
  height: 100vh;

  form {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .list {
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
    position: relative;
  }
`;
