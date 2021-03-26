import React from 'react';
import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    gray50: '#f9fafb',
    gray100: '#f3f4f6',
    gray200: '#e5e7eb',
    gray300: '#d1d5db',
    gray400: '#9ca3af',
    gray500: '#6b7280',
    gray600: '#4b5563',
    gray700: '#374151',
    gray800: '#1f2937',
    gray900: '#111827',
    primary50: '#eef2ff',
    primary100: '#e0e7ff',
    primary200: '#c7d2fe',
    primary300: '#a5b4fc',
    primary400: '#818cf8',
    primary500: '#6366f1',
    primary600: '#4f46e5',
    primary700: '#4338ca',
    primary800: '#3730a3',
    primary900: '#312e81',
  },
  font: {
    family:
      "Poppins, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    sizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
      '7xl': '4.5rem',
      '8xl': '6rem',
      '9xl': '8rem',
    },
  },
  shadows: {
    card: '5px 10px 10px rgba(0, 0, 0, 0.3)',
  },
  screens: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  spacings: {
    none: '0px',
    xxsm: '0.5rem',
    xsm: '0.75rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2.5rem',
    xxl: '3rem',
    xxxl: '6rem',
  },
};

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
