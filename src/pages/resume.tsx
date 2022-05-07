import ResumeTemplate, { ResumeInfoType } from "templates/Resume";

const data: ResumeInfoType = {
  name: 'Rodrigo Vargas',
  title: 'Fullstack Software Engineer',
  email: 'rodrigovargas123@gmail.com',
  phone: '+5551997838846',
  website: 'rodrigovargas.com.br',
  github: 'github.com/rodrigo-vargas',
  experiences: [
    {
      title: 'Senior Developer',
      company: 'Conectt',
      period: '2013 - present',
      location: 'Porto Alegre, Brazil',
      highlights: [
        'Junior developer to lead developer in about 3 years',
        'Promoter of good practices across local team members',
        'Responsible for technical interview of new candidates',
        'Reduced the loading time of the UnimedPOA project by 60% through frontend optimization techniques',
        'Rescue of old contract through good crisis management, interpersonal relationship with the key person and problem solving analysis',
        'Contributed to the front-end methodology code guide of the company',
        'Award employee of the year from the directors board in 2015',
      ],
    },
    {
      title: 'Developer',
      company: 'Imediata',
      period: '2012 - 2013',
      location: 'Cachoeira do Sul, Brazil',
      highlights: [
        "Achieved a full-time position after 8-month internship",
        "Contributed to develop a driver that enable MySQL database access from Cobol File System API",
        "Achieved the trust of the team to provide outsourcing service to clients just after 3 months of internship",
      ],
    },
  ],
  projects: [
    {
      title: "Titanium Imoveis",
      description:
        "This client came to me with a system that needed \
      improvements in the usability, reliability and performance of \
      the administrative part of his website. Using an architecture \
      with React with Redux on frontend and a new API written in \
      .NET Core, I proposed a new layout that addressed more than \
      80 elds of application, making the user experience more \
      pleasant and productive.",
    },
    {
      title: "Favorita Veiculos",
      description:
        "This is a website made with Laravel for a small car dealership. \
      Was developed a system to manage cars and another related \
      information about then like brands, features, acessories and \
      so on",
    },
  ],
  skills: [
    {
      title: 'Programming Languages',
      description: 'C#, JavaScript (ES6), PHP, Ruby'
    },
    {
      title: 'Libraries & Frameworks',
      description: '.NET Core, React, jQuery, Node.js, Jekyll'
    },
    {
      title: 'Web Design & Development',
      description: 'CSS/SASS'
    },
    {
      title: 'Database Management Systems',
      description: 'SQL Server, MySQL, MongoDB'
    },
    {
      title: 'Tools & Platforms',
      description: 'SharePoint, Git, Gulp, Webpack, Netlify, Heroku, Wordpress'
    },
    {
      title: 'UI/UX Design',
      description: 'Adobe XD'
    }
  ],
  education: [
    {
      title: 'Universidade de Santa Cruz do Sul',
      description: 'Bachelor of Computer Engineering'
    }
  ],
  interests: 'Cycling, gaming, reading, investing'
};

export default function Resume() {
  return <ResumeTemplate data={data} />;
}
