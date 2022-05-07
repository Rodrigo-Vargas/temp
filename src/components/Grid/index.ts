import styled, { css } from 'styled-components';

export const FluidContainer = styled.div`
  padding-right: 1rem;
  padding-left: 1rem;
`;

export const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding-right: 1rem;
  padding-left: 1rem;
  width: 100%;

  @media (min-width: 640px) {
    max-width: 640px;
    padding-right: 2rem;
    padding-left: 2rem;
  }

  @media (min-width: 768px) {
    max-width: 768px;
    padding-right: 4rem;
    padding-left: 4rem;
  }

  @media (min-width: 1024px) {
    max-width: 1024px;
    padding-right: 5rem;
    padding-left: 5rem;
  }

  @media (min-width: 1280px) {
    max-width: 1280px;
    padding-right: 7rem;
    padding-left: 7rem;
  }
`;

export const Row = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-wrap: wrap;
    margin-left: -${theme.spacings.md};
    margin-right: -${theme.spacings.md};
  `}
`;

export const Col = styled.div`
  ${({ theme }) => css`
    padding-left: ${theme.spacings.md};
    padding-right: ${theme.spacings.md};
  `}
`;
