import AboutTemplate from 'templates/About';

const data = [
  {
    year: 2021,
    items: [
      {
        category: 'job',
        description: 'Joined Dell Technologies as a Senior Software Engineer',
        image: '/images/about/dell_logo.png',
        title: 'Dell'
      },
      {
        category: 'job',
        description: 'As a freelance project, build a redesign of BCuatro website',
        title: 'BCuatro new website'
      }
    ]
  },
  {
    year: 2020,
    items: [
      {
        category: 'job',
        description: 'Created a brand new admin dashboard for Titanium Imoveis website',
        title: 'Titanium Imóveis'
      }
    ]
  },
  {
    year: 2018,
    items: [
      {
        category: 'job',
        description: 'As a freelance project, launched the first website version of BCuatro',
        title: 'BCuatro'
      },
      {
        category: 'job',
        description: 'As a freelance project, launched the first website version of Favorita Veiculos',
        title: 'Favorita Veículos'
      },
      {
        category: 'travel',
        title: 'Moved to Porto Alegre'
      }
    ]
  },
  {
    year: 2017,
    items: [
      {
        category: 'job',
        description: 'As a freelance project, created the first mobile responsive of ação multimarcas website',
        title: 'Ação Multimarcas'
      }
    ]
  },
  {
    year: 2013,
    items: [
      {
        category: 'travel',
        title: 'Moved to Santa Cruz do Sul'
      },
      {
        category: 'job',
        description: 'Joined Conectt as a C# Software Developer.',
        image: '/images/about/conectt_logo.png',
        title: 'Conectt'
      }
    ]
  },
  {
    year: 2012,
    items: [
      {
        category: 'job',
        description: 'Get my first job at Imediata, a small ERP software development business',
        image: '/images/about/imediata_logo.png',
        title: 'Imediata',
      },
      {
        category: 'education',
        description: 'Graduated from UNISC in Computer Engineering Bachelor"s',
        title: 'Universidade of Santa Cruz do Sul at Brazil',
      }
    ]
  }
]

export default function AboutPage() {
  return <AboutTemplate data={data} />
}