import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import { Content } from './styles';

const Base = ({ children }) => {
  const headerItems = [
    { title: 'Home', href: '/' },
    { title: 'Works', href: '/projects' },
  ];

  return (
    <div>
      <Header items={headerItems} />
      <Content>{children}</Content>
      <Footer />
    </div>
  );
};

export default Base;
