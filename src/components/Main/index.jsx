import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

import Header from '../Header';

const Main = ({ header }) => (
  <>
    <Header items={header} />
    <h1>Hello</h1>
  </>
);

Main.propTypes = {
  header: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string])),
};
Main.defaultProps = {
  header: [],
};

export default Main;
