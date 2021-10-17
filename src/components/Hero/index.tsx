import React from 'react';

import { HeroWrapper, HeroHeading, HeroContainer, HeroBody } from './styles';

export type HeroProps = {
  title: string;
  description: string;
}

const Hero: React.FC<HeroProps> = ({ title, description }: HeroProps) => (
  <HeroWrapper>
    <HeroContainer>
      <HeroHeading>{title}</HeroHeading>
      <HeroBody className="my-5 text-gray-500 mb-24 w-2/3 md:w-1/2">
        {description}
      </HeroBody>
    </HeroContainer>
  </HeroWrapper>
);

export default Hero;
