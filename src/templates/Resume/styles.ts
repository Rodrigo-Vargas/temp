import styled, { css } from 'styled-components';

export const Title = styled.h1`
  ${({ theme }) => css`
    color: ${theme.colors.primary700};
    font-size: ${theme.spacings.xl};
    padding-top: ${theme.spacings.xl};
  `}
`;

export const SubTitle = styled.h2`
  ${({ theme }) => css`
    color: ${theme.colors.gray500};
    font-size: ${theme.spacings.lg};
    margin-bottom: ${theme.spacings.xs};
  `}
`;

export const Meta = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;

    div {
      padding-right: ${theme.spacings.md};
    }

    span {
      color: ${theme.colors.gray500};
      font-size: ${theme.font.sizes.base};
      margin-bottom: ${theme.spacings.xs};
    }
  `}
`;

export const ExperienceItem = styled.div`
  ${({ theme }) => css`
    margin-bottom: ${theme.spacings.lg};
  `}
`;

