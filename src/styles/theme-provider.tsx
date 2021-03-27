import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './theme';

const ThemeInstance = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default ThemeInstance;
