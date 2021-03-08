import styled, { css } from 'styled-components';

import { Container } from '../../styles/common';

export const HeroWrapper = styled.div`
  align-items: center;
  display: flex;
  min-height: 100vh;
`;

export const HeroHeading = styled.h1`
  ${({ theme }) => css`
    color: ${theme.colors.primary700};
    font-size: ${theme.font.sizes['4xl']};
    margin-bottom: 2rem;
  `}
`;

export const HeroBody = styled.article`
  ${({ theme }) => css`
    color: ${theme.colors.gray500};
    width: 100%;

    @media (min-width: ${theme.screens.md}) {
      width: 50%;
    }
  `}
`;

export const HeroContainer = styled(Container)``;
