import { useRouter } from 'next/router'
import Base from 'templates/Base'
import Resouces from '../../../resources'

import Hero from 'components/Hero'

const hero = {
  title: 'Rodrigo Vargas'
}

const Home = () => {
  const { locale } = useRouter();

  return (
    <Base>
      <Hero description={Resouces[locale].homeDescription} title={hero.title} />
    </Base>
  )
}

export default Home