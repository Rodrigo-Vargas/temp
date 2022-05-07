import styled, { css } from 'styled-components';

export const Item = styled.div`
  ${({ theme }) => css`
    margin-bottom: ${theme.spacings.lg};
  `}
`;

export const Title = styled.span`
  ${({ theme }) => css`
    font-weight: ${theme.font.weight.bold};
  `}
`;

export const Company = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.gray400};
  `}
`;

export const Period = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.gray400};
    font-size: ${theme.font.sizes.sm};
  `}
`;

export const Location = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.gray400};
    font-size: ${theme.font.sizes.sm};
  `}
`;

export const List = styled.ul`
  ${({ theme }) => css`
    color: ${theme.colors.gray500};
    margin-top: ${theme.spacings.xs};

    li {
      font-size: ${theme.font.sizes.sm};
      list-style-type: circle;
      margin-left: ${theme.spacings.sm};
    }
  `}
`;
