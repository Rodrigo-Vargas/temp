import styled, { css } from 'styled-components';
import { Container } from '../Grid';

export const HeroWrapper = styled.div`
  ${({ theme }) => css`
    align-items: center;
    display: flex;
    min-height: calc(100vh - ${theme.footer.height} - ${theme.header.height});
  `}
`;

export const HeroHeading = styled.h1`
  ${({ theme }) => css`
    color: ${theme.colors.primary700};
    font-size: ${theme.font.sizes.hg};
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
