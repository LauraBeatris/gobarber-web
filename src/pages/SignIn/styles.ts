import styled, { css } from 'styled-components';
import { shade } from 'polished';
import media from 'styled-media-query'

import signInBackground from '../../assets/sign-in-background.png';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 700px;

  ${media.lessThan('medium')`
      max-width: unset;
   `}

  h1 {
    margin-bottom: 24px;
  }

  form {
    margin: 80px 0;
    width: 50%;
    text-align: center;

    ${media.lessThan('medium')`
      width: 90%;
    `}

    input,
    button {
      border-radius: 10px;
      width: 100%;
    }

    input {
      background: ${({theme}) => theme.colors.darkSecondary};
      border: 2px solid ${({theme}) => theme.colors.darkSecondary};
      color: ${({theme}) => theme.colors.whiteSecondary};
      padding: 16px;
      width: 100%;

      & + input {
        margin-top: 8px;
      }

      &::placeholder {
        color: ${({theme}) => theme.colors.gray};
      }
    }

    button {
      background: ${({theme}) => theme.colors.orange};
      border: 0;
      color: ${({theme}) => theme.colors.darkTerciary};
      height: 56px;
      padding: 0 16px;
      font-weight: 400;
      margin-top: 16px;
      transition: background-color 200ms;

      &:hover {
        ${({theme}) => css`
          background: ${shade(0.1, theme.colors.orange)};
        `}
      }
    }

    a {
      color: ${({theme}) => theme.colors.whiteSecondary};
      display: block;
      margin-top: 24px;
      transition: color 200ms;

      &:hover {
        ${({theme}) => css`
          color: ${shade(0.1, theme.colors.whiteSecondary)};
        `}
      }
    }
  }

  > a {
    display: flex;
    align-items: center;
    color: ${({theme}) => theme.colors.orange};
    transition: color 200ms;

    svg {
      margin-right: 16px;
    }

    &:hover {
        ${({theme}) => css`
          color: ${shade(0.1, theme.colors.orange)};
        `}
      }
  }
`

export const Background = styled.div`
  flex: 1;
  background-color:  ${({theme}) => theme.colors.darkPrimary};
  background-image:  url(${signInBackground});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  ${media.lessThan('medium')`
    display: none;
  `}
`
