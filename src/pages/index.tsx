import React from 'react';

import Main from '../components/Main';

import GlobalStyles from '../styles/global';
import Theme from '../styles/theme-provider';

const hero = {
  description:
    'Blog pessoal de Rodrigo Vargas, um desenvolvedor fullstack que escreve sobre suas experiências usando várias tecnologias como C#, JavaScript, CSS entre outras.',
  title: 'Rodrigo Vargas',
};

const Home: React.FC = () => (
  <Theme>
    <GlobalStyles />
    <Main hero={hero} />
  </Theme>
);

export default Home;
