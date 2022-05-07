import Header from 'components/Header';
import Footer from 'components/Footer';

import { Content } from './styles';
import { useRouter } from 'next/router';

let locale;
let defaultLocale;

export type BaseTemplateProps = {
  children: React.ReactNode;
  hideShell?: boolean;
};

const Base = ({ children, hideShell }: BaseTemplateProps) => {
  const routerProps = useRouter();
  locale = routerProps.locale;
  defaultLocale = routerProps.defaultLocale;

  const headerItems = [
    { title: 'Home', href: getLocalizedLink('') },
    { title: 'Works', href: getLocalizedLink('projects') },
    { title: 'Blog', href: getLocalizedLink('blog') },
    { title: 'About', href: getLocalizedLink('about') },
  ];

  return (
    <div>
      {
        !hideShell && (
          <Header items={headerItems} />
        )
      }
      <Content hideShell={hideShell}>{children}</Content>
      {
        !hideShell && (
          <Footer />
        )
      }
    </div>
  );
};

const getLocalizedLink = (path) => {
  const localePath = locale == defaultLocale ? '' : `${locale}/`;

  return(`/${localePath}${path}`);
};

export default Base;
