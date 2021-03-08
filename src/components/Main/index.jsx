import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

import Header from '../Header';
import Hero from '../Hero';

import headerPropType from '../Header/propTypes';
import heroPropType from '../Hero/propTypes';

const Main = ({ header, hero }) => (
  <>
    <Header items={header} />
    <Hero title={hero.title} description={hero.description} />
  </>
);

Main.propTypes = {
  header: headerPropType,
  hero: PropTypes.shape(heroPropType),
};

Main.defaultProps = {
  header: [],
  hero: {},
};

export default Main;
