import styled, { css } from "styled-components";
import { shade } from "polished";
import media from "styled-media-query";

interface BackgroundProps {
  backgroundImage: string;
}

interface ContainerProps {
  backgroundPosition: "left" | "right";
}

const backgroundPositionStyles = {
  left: css`
        flex-direction: row;
  `,
  right: css`
      flex-direction: row-reverse;

  `,
};

export const Container = styled.div<ContainerProps>`
  min-height: 100vh;
  display: flex;
  align-items: stretch;

  ${({ backgroundPosition }) => (
    backgroundPositionStyles[backgroundPosition]
  )}
`;

export const Content = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 700px;
  padding: 50px 0;

  > div:first-of-type {
    flex: 0;
  }

  h1 {
    text-align: center;
  }

  h1, p {
    margin-bottom: 24px;
  }

  p {
    color: ${({ theme }) => theme.colors.gray};
  }

  form {
    margin: 40px 0;
    width: 50%;
    text-align: center;

    ${media.lessThan("medium")`
      width: 90%;
    `}

    a {
      color: ${({ theme }) => theme.colors.white};
      display: block;
      margin-top: 24px;
      transition: color 200ms;

      &:hover {
        ${({ theme }) => css`
          color: ${shade(0.1, theme.colors.white)};
        `}
      }
    }
  }

  & div > a {
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.colors.orange};
    transition: color 200ms;

    svg {
      margin-right: 16px;
    }

    &:hover {
      ${({ theme }) => css`
        color: ${shade(0.1, theme.colors.orange)};
      `}
    }
  }
`;

export const Background = styled.div<BackgroundProps>`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  ${({ backgroundImage }) => backgroundImage
    && css`
      background-image: url(${backgroundImage});
    `}

  ${media.lessThan("medium")`
    display: none;
  `}
`;
