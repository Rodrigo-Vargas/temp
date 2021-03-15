import React from 'react';
import ProjectCard from '.';

import { render, screen } from '../../utils/tests-utils';

const props = {
  id: '1',
  title: 'Sample Post',
  img: 'https://source.unsplash.com/user/willianjusten/300x140',
  slug: 'sample-post',
  index: 1,
};

describe('<ProjectCard />', () => {
  it('should render correclty', () => {
    const { container } = render(<ProjectCard {...props} />);

    expect(
      screen.getByRole('heading', { name: props.title }),
    ).toBeInTheDocument();

    expect(screen.getByRole('img', { name: props.title })).toHaveAttribute(
      'src',
      props.img,
    );

    expect(screen.getByTestId('project-link', { name: props.title })).toHaveAttribute(
      'href',
      `/projects/${props.slug}`,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
