import React from 'react';

import Header from '../Header';

import headerPropType from '../Header/propTypes';

const Main = ({ header }) => (
  <>
    <Header items={header} />
    <h1>Hello</h1>
  </>
);

Main.propTypes = {
  header: headerPropType,
};

Main.defaultProps = {
  header: [],
};

export default Main;
