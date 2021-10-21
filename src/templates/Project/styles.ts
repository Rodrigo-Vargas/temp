import styled, { css } from 'styled-components';

export const Title = styled.h1`
  ${({ theme }) => css`
    color: ${theme.colors.primary700};
    font-size: ${theme.font.sizes.xhg};
    font-weight: ${theme.font.weight.bold};
    margin-bottom: ${theme.spacings.xs};
    padding-top: ${theme.spacings.xl};
  `}
`;

export const SecondaryTitle = styled.h2`
  ${({ theme }) => css`
    border-left: 8px solid ${theme.colors.primary700};
    color: ${theme.colors.primary700};
    font-size: ${theme.font.sizes.hg};
    font-weight: ${theme.font.weight.bold};
    line-height: ${theme.font.sizes.hg};
    margin-bottom: ${theme.spacings.xxl};
    padding-left: ${theme.spacings.sm};
  `}
`;

export const Excerpt = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.gray500};
    font-weight: ${theme.font.weight.light};
    margin-bottom: ${theme.spacings.xl};
    max-width: 50%;
  `}
`;

export const ButtonsWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    margin-bottom: ${theme.spacings.xxl};
  `}
`;

export const Button = styled.a`
  ${({ theme }) => css`
    align-items: center;
    background-color: ${theme.colors.primary600};
    border-radius: 10px;
    border: 1px solid ${theme.colors.primary600};
    color: ${theme.colors.gray50};
    display: flex;
    margin-right: ${theme.spacings.xxl};
    text-decoration: none;
    transition: all 0.5s;
    padding: 0 ${theme.spacings.md} 0 0;

    &:hover {
      background-color: ${theme.colors.gray50};
      color: ${theme.colors.primary600};
    }

    svg {
      display: block;
      height: 40px;
      width: 40px;
    }
  `}
`;

export const ProjectContent = styled.div`
  ${({ theme }) => css`
    margin-bottom: ${theme.spacings.xxl};

    & p {
      color: ${theme.colors.gray500};
      font-weight: ${theme.font.weight.light};
    }
  `}
`;

export const TechUsedWrapper = styled.div`
  ${({ theme }) => css`
    margin-bottom: ${theme.spacings.xxl};

    li {
      color: ${theme.colors.gray500};
      font-weight: ${theme.font.weight.light};
    }
  `}
`;

export const NextProjectWrapper = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.gray200};
    margin-top: ${theme.spacings.xxl};
    padding: ${theme.spacings.xxl} 0;

    a {
      max-width: 200px;
    }
  `}
`;

export const NextProjectTitle = styled.h2`
  ${({ theme }) => css`
    color: ${theme.colors.primary700};
    font-size: ${theme.font.sizes.xxl};
    font-weight: ${theme.font.weight.bold};
    margin-bottom: ${theme.spacings.xxl};
  `}
`;

export const NextProjectSubTitle = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.gray400};
    font-size: ${theme.font.sizes.base};
    font-weight: ${theme.font.weight.light};
    margin-bottom: ${theme.spacings.xxl};
  `}
`;
