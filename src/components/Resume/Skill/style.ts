import styled, { css } from 'styled-components';

export const Description = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.gray400};
    font-size: ${theme.font.sizes.xs};
    font-weight: ${theme.font.weight.light};
    margin-bottom: ${theme.spacings.sm};
  `}
`;

export const Title = styled.h3`
  ${({ theme }) => css`
    color: ${theme.colors.gray800};
    font-size: ${theme.font.sizes.xs};
  `}
`;
