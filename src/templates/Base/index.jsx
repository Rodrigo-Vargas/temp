import React from 'react';
import Header from '../../components/Header';

import { Content } from './styles';

const Base = ({ children }) => {
  const headerItems = [
    { title: 'Home', href: '/' },
    { title: 'Works', href: '/works' },
  ];

  return (
    <div>
      <Header items={headerItems} />
      <Content>{children}</Content>
    </div>
  );
};

export default Base;
