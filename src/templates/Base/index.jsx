import React from 'react';
import Header from '../../components/Header';

import { Content } from './styles';

const Base = ({ children }) => {
  const headerItems = [
    { title: 'Projects' },
    { title: 'Posts' },
  ];

  return (
    <div>
      <Header items={headerItems} />
      <Content>
        {children}
      </Content>
    </div>
  );
};

export default Base;
