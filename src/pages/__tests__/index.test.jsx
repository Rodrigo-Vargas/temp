import React from 'react';
import { render, screen } from '@testing-library/react';

import Main from '../../components/Main';

import headerMock from '../../components/Header/mock';
import heroMock from '../../components/Hero/mock';

const props = {
  header: headerMock,
  hero: heroMock,
};

jest.mock('../../components/Header', () => ({
  __esModule: true,
  default: function Mock() {
    return <div data-testid="Header" />;
  },
}));

jest.mock('../../components/Hero', () => ({
  __esModule: true,
  default: function Mock() {
    return <div data-testid="Hero" />;
  },
}));

describe('Index Page', () => {
  it('should render the page with components', () => {
    render(<Main {...props} />);
    expect(screen.getByTestId('Header')).toBeInTheDocument();
    expect(screen.getByTestId('Hero')).toBeInTheDocument();
  });
});
