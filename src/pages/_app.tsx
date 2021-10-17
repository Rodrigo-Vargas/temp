import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from 'styles/theme';

function CustomApp({ Component, pageProps }) {
   return (
      <ThemeProvider theme={theme}>
         <Component {...pageProps} />
      </ThemeProvider>
   );
}

export default CustomApp
