/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-danger */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import Theme from './styles/theme';

interface HTMLProps {
  body: string;
  headComponents: Array<any>;
  preBodyComponents: Array<any>;
  postBodyComponents: Array<any>;
  htmlAttributes: any;
  bodyAttributes: any;
}

const HTML: React.FC<HTMLProps> = ({
  body,
  headComponents,
  preBodyComponents,
  postBodyComponents,
  htmlAttributes,
  bodyAttributes,
}) => (
  <html {...htmlAttributes}>
    <head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600&amp;display=swap"
        rel="stylesheet"
      />
      {headComponents}
    </head>
    <body {...bodyAttributes}>
      {preBodyComponents}
      <ThemeProvider theme={Theme}>
        <div
          key="body"
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: body }}
        />
      </ThemeProvider>
      {postBodyComponents}
    </body>
  </html>
);

export default HTML;
