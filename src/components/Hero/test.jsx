import React from 'react';
import { render, screen } from '../../utils/tests-utils';

import Hero from '.';

describe('<Hero />', () => {
  it('should render the hero', () => {
    render(<Hero title="John Doe" description="That is a description" />);

    expect(screen.getByRole('heading', { name: /John Doe/ })).toBeInTheDocument();
    expect(screen.getByRole('article')).toBeInTheDocument();
  });
});
