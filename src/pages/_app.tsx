import React from 'react'
import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

import GlobalStyles from 'styles/global'

function CustomApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default CustomApp
