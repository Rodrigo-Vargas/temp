import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

import Hero from '../Hero';

import heroPropType from '../Hero/propTypes';
import Base from '../../templates/Base';

const Main = ({ hero }) => (
  <Base>
    <Hero title={hero.title} description={hero.description} />
  </Base>
);

Main.propTypes = {
  hero: PropTypes.shape(heroPropType),
};

Main.defaultProps = {
  hero: {},
};

export default Main;
