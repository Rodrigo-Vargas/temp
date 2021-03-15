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

  /* @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: local('Poppins Light'), local('Poppins-Light'),
        url('assets/fonts/Poppins-Light.woff2') format('woff2');
  }

  @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src: local('Poppins Medium'), local('Poppins-Medium'),
        url('assets/fonts/Poppins-Medium.woff2') format('woff2');
  }

  @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: local('Poppins SemiBold'), local('Poppins-SemiBold'),
        url('assets/fonts/Poppins-SemiBold.woff2') format('woff2');
  } */

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
