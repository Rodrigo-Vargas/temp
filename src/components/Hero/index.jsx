import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

import {
  HeroWrapper, HeroHeading, HeroContainer, HeroBody,
} from './styles';

const Hero = ({ title, description }) => (
  <HeroWrapper>
    <HeroContainer>
      <HeroHeading>{title}</HeroHeading>

      <HeroBody className="my-5 text-gray-500 mb-24 w-2/3 md:w-1/2">{description}</HeroBody>
    </HeroContainer>
  </HeroWrapper>
);

Hero.defaultProps = {
  title: '',
  description: '',
};

Hero.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

export default Hero;
