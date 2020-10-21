import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;

  input {
    flex-grow: 1;
  }

  & + div {
    margin-top: 8px;
  }

  div:first-child {
    border-radius: 10px 0 0 10px !important;
  }
`;

export const HidePasswordButtonContainer = styled.div`
  width: 4rem;
  display: flex;
  margin-top: unset !important;
  background: ${({ theme }) => theme.colors.shape};
  align-items: center;
  justify-content: center;
  border-radius: 0 10px 10px 0 !important;

  button {
    background: none;
    border: none;
    width: 100%;
    height: 100%;
  }
`;
