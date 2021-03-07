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
  },
};

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
