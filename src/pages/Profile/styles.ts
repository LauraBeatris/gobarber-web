import styled from "styled-components";
import { shade } from "polished";

export const Container = styled.div`
  display: flex;
  min-width: "100vw";
  min-height: "100vh";
  flex-direction: column;
  justify-content: center;
  padding: 0 20px;

  header {
    top: 0;
    left: 0;
    right: 0;
    height: 140px;
    padding: 0 20px;
    position: absolute;
    background: ${({ theme }) => theme.colors.blackMedium};

    div {
      width: 100%;
      margin: 0 auto;
      display: flex;
      height: 100%;
      max-width: 1120px;
      align-items: center;
    }

    button {
      border: 0;
      background: none;

      svg {
        color: ${({ theme }) => theme.colors.gray};
        font-size: 24px;
      }
    }
  }
`;

export const Content = styled.main`
  max-width: 25rem;
  width: 100%;
  margin: 50px auto;

  h1 {
    font-size: 20px;
    margin-bottom: 24px;
  }

  form div:nth-of-type(4) {
    margin-top: 24px;
  }

  > button {
    margin-top: 24px;
  }
`;

export const AvatarInput = styled.div`
  width: 18.6rem;
  height: 18.6rem;
  margin: 0 auto 32px auto;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }

  label {
    right: 0;
    width: 4rem;
    bottom: 0;
    height: 4rem;
    cursor: pointer;
    position: absolute;
    background: ${({ theme }) => theme.colors.orange};
    border-radius: 50%;

    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: ${({ theme }) => shade(0.2, theme.colors.orange)};
    }

    input {
      display: none;
    }

    svg {
      font-size: 20px;
      color: ${({ theme }) => theme.colors.background};
    }
  }
`;
