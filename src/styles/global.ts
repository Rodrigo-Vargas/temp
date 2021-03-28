import { createGlobalStyle, css } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  *, *:before, *:after {
    border-width: 0;
    box-sizing: border-box;
  }

  body, h1, h2, h3, h4, h5, h6, p, ol, ul {
    margin: 0;
    padding: 0;
    font-weight: normal;
  }

  ol, ul {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  .w-50 {
    width: 50%;
  }

  ${({ theme }) => css`
    html {
      background-color: ${theme.colors.gray100};
      box-sizing: border-box;
      font-size: 16px;
    }

    body {
      font-family: ${theme.font.family};
    }
  `}
`;

export default GlobalStyles;
