import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: ${({ theme }) => theme.colors.background};
  }

  body, input, button {
    font: 16px 'Roboto Slab', serif;
    color: #FFF;
  }

  html, body, #root {
    min-height: 100%;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }


  input, button {
    cursor: pointer;
  }

  a {
    text-decoration: none;
  }
`;
