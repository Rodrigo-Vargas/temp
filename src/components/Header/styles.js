import styled, { css } from 'styled-components';

export const Logo = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.gray50};
    border-left: solid 3px ${theme.colors.primary700};
    border-right: solid 3px ${theme.colors.primary700};
    height: 28.87px;
    margin: 14.43px 0;
    position: relative;
    width: 50px;

    &:before, &:after {
      background-color: inherit;
      content: "";
      height: 35.36px;
      left: 4.3223px;
      position: absolute;
      transform: scaleY(0.5774) rotate(-45deg);
      width: 35.36px;
      z-index: 1;
    }

    &:before {
      top: -17.6777px;
      border-top: solid 4.2426px ${theme.colors.primary700};
      border-right: solid 4.2426px ${theme.colors.primary700};
    }

    &:after {
      bottom: -17.6777px;
      border-bottom: solid 4.2426px ${theme.colors.primary700};
      border-left: solid 4.2426px ${theme.colors.primary700};
    }
  `}
`;

export const LogoText = styled.a`
  ${({ theme }) => css`
    align-items: center;
    color: ${theme.colors.primary500};
    display: flex;
    height: 100%;
    justify-content: center;
    position: absolute;
    text-align: center;
    z-index: 10;
    width: 100%;
  `}
`;

export const Another = styled.div``;
