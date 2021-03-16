import React from 'react';
import TransitionLink from 'gatsby-plugin-transition-link';
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

const Box = posed.div({
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
});

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
                <TransitionLink
                  to={link.href}
                  exit={{
                    trigger: ({ exit, node }) => console.log(exit, node),
                    lenght: 1,
                  }}
                  entry={{
                    delay: 0.6,
                  }}
                >
                  <NavItemText>{link.title}</NavItemText>
                </TransitionLink>
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
