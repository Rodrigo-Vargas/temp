import { createGlobalStyle, css, DefaultTheme, GlobalStyleComponent } from "styled-components"

type GlobalStylesProps = {
  removeBg?: boolean
}

const GlobalStyles: GlobalStyleComponent<
  GlobalStylesProps,
  DefaultTheme
> = createGlobalStyle`
  @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: local('Poppins Light'), local('Poppins-Light'),
        url('/fonts/poppins-v15-latin-300.woff2') format('woff2');
  }

  @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src: url('/fonts/poppins-v15-latin-regular.woff2') format('woff2');
  }

  @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: local('Poppins SemiBold'), local('Poppins-SemiBold'),
        url('/fonts/poppins-v15-latin-600.woff2') format('woff2');
  }

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

    p {
      margin-bottom: ${theme.spacings.lg};
    }

    blockquote {
      background-color: ${theme.colors.primary100};
      border-color: ${theme.colors.primary500};
      color: ${theme.colors.primary500};
      padding: ${theme.spacings.md};
    }
    
  `}
`
export default GlobalStyles
