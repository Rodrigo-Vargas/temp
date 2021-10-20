import React from 'react';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

import { Wrapper } from './styles';

const Slider: React.FC = ({ children }) => {
  return (
    <Wrapper>
      <AwesomeSlider>{children}</AwesomeSlider>
    </Wrapper>
  );
};

export default Slider;
