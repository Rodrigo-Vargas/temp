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
      }
    ]
  },
  {
    year: 2018,
    items: [
      {
        category: 'job',
        title: 'Favorita Veículos'
      }
    ]
  },
  {
    year: 2013,
    items: [
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
        date: 'September 2020',
        image: '/images/about/imediata_logo.png',
        title: 'Imediata',
      },
      {
        category: 'education',
        description: 'Graduated from UNISC in Computer Engineering Bachelor"s',
        date: '2020',
        title: 'Universidade of Santa Cruz do Sul at Brazil',
      }
    ]
  }
]

export default function AboutPage() {
  return <AboutTemplate data={data} />
}