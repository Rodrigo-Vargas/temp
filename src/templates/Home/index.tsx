import Base from 'templates/Base'

import Hero from 'components/Hero'

const hero = {
  description:
    'Blog pessoal de Rodrigo Vargas, um desenvolvedor fullstack que escreve sobre suas experiências usando várias tecnologias como C#, JavaScript, CSS entre outras.',
  title: 'Rodrigo Vargas'
}

const Home = () => (
  <Base>
    <Hero description={hero.description} title={hero.title} />
  </Base>
)

export default Home
