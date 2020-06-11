import styled, { css } from 'styled-components';

export const Container = styled.div`
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.darkSecondary};
  border: 2px solid ${({ theme }) => theme.colors.darkSecondary};
  color: ${({ theme }) => theme.colors.whiteSecondary};
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  padding: 0 16px;

  svg {
    font-size: 20px;
    margin-right: 10px;
    color: ${({ theme }) => theme.colors.gray};
  }

  & + div {
    margin-top: 8px;
  }

  input {
    flex: 1;
    background: transparent;
    border: none;
    height: 100%;
    width: 100%;
    padding: 16px 0;

    &::placeholder {
      color: ${({ theme }) => theme.colors.gray};
    }

    &,
    &:-internal-autofill-selected {
      background-color: transparent !important;
      color: ${({ theme }) => theme.colors.whiteSecondary} !important;
    }

    &:-webkit-autofill,
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus {
      ${({ theme }) => css`
        -webkit-box-shadow: 0 0 0px 1000px ${theme.colors.darkSecondary} inset;
        -webkit-text-fill-color: ${theme.colors.whiteSecondary} !important;
        transition: background-color 5000s ease-in-out 0s;
      `}
    }
  }
`;
