import Link from 'next/link';
import { useRouter } from 'next/router';

export type headerPropTypeItem = {
  title: string;
  href: string;
};

import {
  HeaderContainer,
  HeaderGroup,
  HeaderWrapper,
  LanguageSelector,
  Logo,
  LogoText,
  NavGroup,
  NavWrapper,
  NavItem,
  Separator
} from './styles';


const Header = ({ items }) => {
  const { locale, locales, asPath } = useRouter();
  
  return (
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
                  <NavItem href={link.href}>{link.title}</NavItem>
                </li>
              ))}

              <Separator>|</Separator>

              {locales.map((l, i) => {
                return (
                  <LanguageSelector className={l === locale ? "selected" : ""} key={i}>
                    <Link href={asPath} locale={l} >
                      {l}
                    </Link>
                  </LanguageSelector>
                );
              })}
            </NavWrapper>
          </NavGroup>
        </HeaderContainer>
      </HeaderGroup>
    </HeaderWrapper>
  )
}

Header.defaultProps = {
  items: [],
};

export type headerPropType = {
  items: headerPropTypeItem[];
};

export default Header;
