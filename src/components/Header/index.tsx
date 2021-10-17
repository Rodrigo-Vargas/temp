export type headerPropTypeItem = {
  title: string,
  href: string,
};

import {
  HeaderContainer,
  HeaderGroup,
  HeaderWrapper,
  Logo,
  LogoText,
  NavGroup,
  NavWrapper,
  NavItem,
} from './styles';

const Header = ({ items }) => (
  <HeaderWrapper data-collapse="scroll" data-collapse-trigger-height="100">
    <HeaderGroup>
      <HeaderContainer>
        <Logo>
          <LogoText href="/">RV</LogoText>
        </Logo>

        <NavGroup>
          <NavWrapper>
            {items?.map((link) => (
              <li key={link.title} className="pl-5">
                <NavItem href={link.href}>
                  {link.title}
                </NavItem>
              </li>
            ))}
          </NavWrapper>
        </NavGroup>
      </HeaderContainer>
    </HeaderGroup>
  </HeaderWrapper>
);

Header.defaultProps = {
  items: [],
};

export type headerPropType = {
  items: headerPropTypeItem[],
};

export default Header;
