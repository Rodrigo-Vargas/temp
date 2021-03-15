import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  ${({ theme }) => css`
    padding-left: ${theme.spacers.p2};
    padding-right: ${theme.spacers.p2};
  `}
  width: 100%;
`;

export const TagList = styled.div`
  ${({ theme }) => css`
    padding-bottom: ${theme.spacers.p5};
    padding-top: ${theme.spacers.p2};
  `}
`;

export const Tag = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.gray300};
    padding-bottom: ${theme.spacers.p1};
    padding-right: ${theme.spacers.p5};
    padding-top: ${theme.spacers.p1};
  `}
`;

export const Title = styled.h2`
  ${({ theme }) => css`
    color: ${theme.colors.gray800};
    font-size: ${theme.font.sizes['2xl']};
    margin-bottom: ${theme.spacers.p3};
  `}
`;

export const Link = styled.a`
  ${({ theme }) => css`
    min-height: 16rem;
    background-color: ${theme.colors.gray50};
    border-radius: 0.375rem;
    display: block;
    margin-bottom: 0.75rem;
    padding: 1.25rem;
    padding-bottom: 12rem;
    position: relative;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
    transition-duration: 300ms;

    &:hover {
      background-color: ${theme.colors.primary600};
      transform: scale(98%);
    }
  `}
`;

export const ImageBox = styled.div`
  bottom: 0;
  position: absolute;
`;

export const Image = styled.div`
  ${({ theme }) => css`
    height: ${theme.spacers.p36};
    margin-left: auto;
    margin-right: auto;
    overflow: hidden;
    width: 80%;
  `}
`;

export const Another = {};
