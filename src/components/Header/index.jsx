import React from 'react';
import headerPropType from './propTypes';

import {
  HeaderContainer,
  HeaderGroup,
  HeaderWrapper,
  Logo,
  LogoText,
  NavGroup,
  NavWrapper,
  NavItem,
  NavItemText,
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
            {items?.map((map) => (
              <li key={map.title} className="pl-5">
                <NavItem
                  className="{{cssClass}}"
                  href={map.href}
                  target="{{target}}"
                >
                  <NavItemText>{map.title}</NavItemText>
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

Header.propTypes = {
  items: headerPropType,
};

export default Header;
