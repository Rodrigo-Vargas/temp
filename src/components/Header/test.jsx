import React from 'react';
import { render, screen } from '../../utils/tests-utils';

import headerMock from './mock';
import Header from '.';

describe('<Header />', () => {
  it('should render the header', () => {
    render(<Header items={headerMock} />);

    expect(
      screen.getByRole('link', { name: 'RV' }),
    ).toHaveAttribute('href', '/');

    expect(screen.getByText(/Posts/)).toBeInTheDocument();
    expect(screen.getByText(/Projects/)).toBeInTheDocument();
  });
});
