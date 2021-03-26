/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const Circle = styled.circle`
  stroke-dasharray: 1568;
  stroke-dashoffset: 1568;
  transition: stroke-dashoffset 0.35s ease-out 0s;

  &:hover {
    stroke-dashoffset: 0;
  }
`;

export const Svg = styled.svg`
  &:hover ${Circle} {
    stroke-dashoffset: 0;
  }
`;
