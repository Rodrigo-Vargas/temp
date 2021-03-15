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

    --tw-bg-opacity: 1;
    background-color: rgba(249, 250, 251, var(--tw-bg-opacity));
    border-radius: 0.375rem;
    display: block;
    margin-bottom: 0.75rem;
    padding: 1.25rem;
    padding-bottom: 12rem;
    position: relative;
    --tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
    --tw-translate-x: 0;
    --tw-translate-y: 0;
    --tw-rotate: 0;
    --tw-skew-x: 0;
    --tw-skew-y: 0;
    --tw-scale-x: 1;
    --tw-scale-y: 1;
    transform: translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
    transition-duration: 300ms;
  `}
`;

export const Another = {};
