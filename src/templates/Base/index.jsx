import React from 'react';
import { TransitionState } from 'gatsby-plugin-transition-link';
import Header from '../../components/Header';

import { Content } from './styles';

const Base = ({ children }) => {
  const headerItems = [
    { title: 'Home', href: '/' },
    { title: 'Projects', href: '/projects' },
    { title: 'Posts', href: '/posts' },
  ];

  const Box = posed.div({
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  });

  return (
    <div>
      <TransitionState>
        {({ mount, transitionStatus }) => {
          console.log(transitionStatus);
          return <Box className="box" pose={mount ? 'visible' : 'hidden'} />;
        }}
      </TransitionState>
      <Header items={headerItems} />
      <Content>{children}</Content>
    </div>
  );
};

export default Base;
