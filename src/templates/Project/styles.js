/* eslint-disable import/prefer-default-export */
import styled, { css } from 'styled-components';

export const Title = styled.h1`
  ${({ theme }) => css`
    color: ${theme.colors.primary700};
    font-size: ${theme.spacings.xl};
    margin-bottom: ${theme.spacings.xs};
    padding-top: ${theme.spacings.xl};
  `}
`;
