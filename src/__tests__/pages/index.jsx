import React from 'react';
import renderer from 'react-test-renderer';

import Header from '../../components/Header';

describe('Index Page', () => {
  it('should render the Header component', () => {
    const tree = renderer
      .create(<Header />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
