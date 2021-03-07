import React from 'react';
import { render, screen } from '@testing-library/react';

import Main from '../../components/Main';

import headerMock from '../../components/Header/mock';

const props = {
  header: headerMock,
};

jest.mock('../../components/Header', () => ({
  __esModule: true,
  default: function Mock() {
    return <div data-testid="Header" />;
  },
}));

describe('Index Page', () => {
  it('should render the page with components', () => {
    render(<Main {...props} />);
    expect(screen.getByTestId('Header')).toBeInTheDocument();
  });
});
