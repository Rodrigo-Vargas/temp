import styled, { css } from 'styled-components';
import AniLink from 'gatsby-plugin-transition-link/AniLink';

import { Container } from '../Grid';

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
    color: ${theme.colors.primary700};
    display: flex;
    height: 100%;
    justify-content: center;
    position: absolute;
    text-align: center;
    text-decoration: none;
    z-index: 10;
    width: 100%;
  `}
`;

export const NavGroup = styled.nav`
  display: flex;
  margin-left: auto;
`;

export const NavWrapper = styled.ul`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const NavItem = styled(AniLink)`
  ${({ theme }) => css`
    color: ${theme.colors.gray500};
    display: block;
    padding-left: 1rem;
    text-decoration: none;

    &:hover {
      color: ${theme.colors.primary500};
    }
  `}
`;

export const HeaderWrapper = styled.header`
  ${({ theme }) => css`
    background-color: ${theme.colors.gray50};
    position: fixed;
    width: 100%;
    transition: all 0.5s;
    top: 0;
    z-index: 10;
  `}
`;

export const HeaderGroup = styled.div`
  ${({ theme }) => css`
    border-color: ${theme.colors.gray200};
    border-style: solid;
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
    border-bottom-width: 1px;
    z-index: 10;
  `}
`;

export const HeaderContainer = styled(Container)`
  display: flex;
`;
