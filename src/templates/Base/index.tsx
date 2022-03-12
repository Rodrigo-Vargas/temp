import Header from 'components/Header';
import Footer from 'components/Footer';

import { Content } from './styles';
import { useRouter } from 'next/router';

let locale;
let defaultLocale;

const Base = ({ children }) => {
  const routerProps = useRouter();
  locale = routerProps.locale;
  defaultLocale = routerProps.defaultLocale;

  const headerItems = [
    { title: 'Home', href: getLocalizedLink('') },
    { title: 'Works', href: getLocalizedLink('projects') },
    { title: 'Blog', href: getLocalizedLink('blog') },
  ];

  return (
    <div>
      <Header items={headerItems} />
      <Content>{children}</Content>
      <Footer />
    </div>
  );
};

const getLocalizedLink = (path) => {
  const localePath = locale == defaultLocale ? '' : `${locale}/`;

  return(`/${localePath}${path}`);
};

export default Base;
