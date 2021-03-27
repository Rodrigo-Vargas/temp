import React from 'react';

import Hero from '../Hero';

import Base from '../../templates/Base';

interface MainProps {
  hero: {
    title: string;
    description: string;
  };
}

const Main: React.FC<MainProps> = ({ hero }) => (
  <Base>
    <Hero title={hero.title} description={hero.description} />
  </Base>
);

export default Main;
