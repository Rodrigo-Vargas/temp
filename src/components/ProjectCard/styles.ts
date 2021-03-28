import styled, { css } from 'styled-components';

export const TagList = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-grow: 1;
    padding-bottom: ${theme.spacings.md};
    transform-style: preserve-3d;
  `}
`;

export const Tag = styled.span`
  ${({ theme }) => css`
    border: 1px solid ${theme.colors.gray200};
    border-radius: 20px;
    color: ${theme.colors.gray200};
    display: inline-block;
    font-size: ${theme.font.sizes.sm};
    margin-right: ${theme.spacings.md};
    padding-left: ${theme.spacings.sm};
    padding-right: ${theme.spacings.sm};
    padding-bottom: ${theme.spacings.xs};
    padding-top: ${theme.spacings.xs};
    transition: transform .485s cubic-bezier(.5,1.5,.5,1.5);
    transition-delay: 0s;
    transform-origin: 50% 50% -10px;
    opacity: 0;
    transform: rotateX(90deg);
  `}
`;

export const CardHeader = styled.div`
  ${({ theme }) => css`
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    padding: ${theme.spacings.md};
    transition: all 0.5s;
  `}
`;

export const Title = styled.h2`
  ${({ theme }) => css`
    color: ${theme.colors.primary700};
    font-size: ${theme.font.sizes['2xl']};
    font-weight: 400;
    margin-top: ${theme.spacings.md};
  `}
`;

export const LinkTitle = styled.a`
  display: flex;
  flex-grow: 2;
  text-decoration: none;
  width: 80%;
  z-index: 1;

  &:before {
    content: "";
    display: block;
    position: absolute;
    z-index: 0;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
  }
`;

export const Meta = styled.div`
  margin-left: auto;
  z-index: 2;
`;

export const MetaLink = styled.a`
  ${({ theme }) => css`
    align-items: center;
    border-radius: 50%;
    color: ${theme.colors.primary600};
    display: flex;
    font-size: ${theme.font.sizes.md};
    height: ${theme.spacings.xl};
    justify-content: center;
    transition: border 0.5s;
    width: ${theme.spacings.xl};
  `}
`;

export const CardWrapper = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.gray50};
    box-shadow: ${theme.shadows.card};
    display: block;
    border-radius: 0.375rem;
    margin-bottom: ${theme.spacings.xxl};
    min-height: 18rem;
    overflow: hidden;
    position: relative;
    text-decoration: none;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
    transition-duration: 300ms;

    &:hover {
      background-color: ${theme.colors.primary700};
      transform: scale(0.98);
    }

    &:hover ${Image} {
      width: 80%;
    }

    &:hover ${ImageBox} {
      bottom: -20%;
    }

    &:hover ${Tag} {
      color: ${theme.colors.primary300};
      opacity: 1;
      transform: translate3d(0,0,0) rotateX(0);
      transition-delay: 0.49s;
    }

    &:hover ${MetaLink} {
      color: ${theme.colors.gray50};
    }

    &:hover ${Title} {
      color: ${theme.colors.gray50};
    }
  `}
`;

export const ImageBox = styled.div`
  bottom: 0;
  left: 0;
  position: absolute;
  transition: all 0.5s;
`;

export const Image = styled.div`
  ${({ theme }) => css`
    height: 180px;
    margin-left: auto;
    margin-right: auto;
    overflow: hidden;
    transition: all 0.5s;
    width: 100%;
  `}
`;
