import styled, { css } from 'styled-components';
import { Col } from '@components/Grid';

export const PostCard = styled.a`
  ${({ theme }) => css`
    background-color: ${theme.colors.gray50};
    border-radius: ${theme.spacings.md};
    border-top: 4px solid ${theme.colors.primary600};
    display: block;
    margin-bottom: ${theme.spacings.md};
    min-height: ${theme.spacings.xhg};
    padding: ${theme.spacings.md};
    position: relative;
    text-decoration: none;
    transition: all 0.5s;

    &:hover {
      box-shadow: ${theme.shadows.card};
    }
  `};
`;

export const CardTitle = styled.h2`
  ${({ theme }) => css`
    color: ${theme.colors.gray800};
    font-size: ${theme.font.sizes.xl};
    margin-bottom: ${theme.spacings.md};
  `}
`;

export const Excerpt = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.gray500};
  `}
`;

export const CardCol = styled(Col)`
  ${({ theme }) => css`
    width: 33.33%;
  `}
`;
