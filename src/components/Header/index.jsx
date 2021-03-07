import React from 'react';
import headerPropType from './propTypes';

import { Logo, LogoText } from './styles';

const Header = ({ items }) => (
  <header className="z-10 fixed w-full bg-gray-50 transition-all duration-500" data-collapse="scroll" data-collapse-trigger-height="100">
    <div className="py-5 border-b border-gray-200 dark:border-gray-800   dark:bg-gray-900 z-10">
      <div className="container mx-auto">
        <div className="flex items-center">

          <div className="w-3/4 md:w-1/4">
            <Logo>
              <LogoText href="/">RV</LogoText>
            </Logo>
          </div>

          <nav id="top-nav" className="nav w-64 md:w-3/4 hidden md:flex flex-col md:flex-row items-center text-center justify-center md:justify-end z-20">
            <ul className="flex flex-col md:flex-row items-center justify-end">
              { items?.map((map) => (
                <li key={map.title} className="pl-5">
                  <a className="nav-link block {{cssClass}}" href={map.href} target="{{target}}">
                    <span className="text-gray-500">{map.title}</span>
                  </a>
                </li>
              )) }
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </header>
);

Header.defaultProps = {
  items: [],
};

Header.propTypes = {
  items: headerPropType,
};

export default Header;
