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

export const NavItem = styled.a`
  display: block;
  padding-left: 1rem;
`;

export const NavItemText = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.gray500};
  `}
`;

export const HeaderWrapper = styled.header`
  ${({ theme }) => css`
    background-color: ${theme.colors.gray50};
    position: fixed;
    width: 100%;
    transition: all 0.5s;
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

export const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding-right: 1rem;
  padding-left: 1rem;
  width: 100%;

  @media (min-width: 640px) {
    max-width: 640px;
    padding-right: 2rem;
    padding-left: 2rem;
  }

  @media (min-width: 768px) {
    max-width: 768px;
    padding-right: 4rem;
    padding-left: 4rem;
  }

  @media (min-width: 1024px) {
    max-width: 1024px;
    padding-right: 5rem;
    padding-left: 5rem;
  }

  @media (min-width: 1280px) {
    max-width: 1280px;
    padding-right: 7rem;
    padding-left: 7rem;
  }
`;

export const HeaderContainer = styled(Container)`
  display: flex;
`;
