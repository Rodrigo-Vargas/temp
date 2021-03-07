import React from 'react';
import Main from '../components/Main';

import GlobalStyles from '../styles/global';
import Theme from '../styles/theme';

const headerItems = [
  { title: 'Projects' },
  { title: 'Posts' },
];

const Home = () => (
  <Theme>
    <GlobalStyles />
    <Main header={headerItems} />
  </Theme>
);

export default Home;
