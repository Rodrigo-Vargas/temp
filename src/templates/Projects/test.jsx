import React from 'react';

import ProjectsTemplate from '.';
import { render, screen } from '../../utils/tests-utils';

import projectsMock from './mocks';

describe('<Projects />', () => {
  it('should render the page with components', () => {
    render(<ProjectsTemplate items={projectsMock} />);

    expect(
      screen.getByRole('heading', { name: 'Sample Project' }),
    ).toBeInTheDocument();
  });
});
