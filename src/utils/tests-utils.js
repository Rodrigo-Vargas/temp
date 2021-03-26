/* eslint-disable no-undef */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import { render } from '@testing-library/react';
import TransitionLinkProvider from 'gatsby-plugin-transition-link/context/InternalProvider';

import Theme from '../styles/theme';

const customRender = (ui, renderOptions) => render(
  <Theme><TransitionLinkProvider>{ui}</TransitionLinkProvider></Theme>, renderOptions,
);

export * from '@testing-library/react';
export { customRender as render };
