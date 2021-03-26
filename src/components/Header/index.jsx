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
                <NavItem cover direction="left" duration={1} bg="#4338ca" to={link.href}>
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

Header.propTypes = {
  items: headerPropType,
};

export default Header;
