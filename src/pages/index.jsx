import React from 'react';
import Main from '../components/Main';

import Theme from '../styles/theme';

const headerItems = [
  { title: 'Projects' },
  { title: 'Posts' },
];

const Home = () => (
  <Theme>
    <Main header={headerItems} />
  </Theme>
);

export default Home;
