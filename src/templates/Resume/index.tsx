import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';


import Base from 'templates/Base';
import { ExperienceItem, Meta, SubTitle, Title } from './styles';

type ExperienceType = {
  company: string;
  highlights: string[];
  location: string;
  period: string;
  title: string;
}

type ProjectType = {
  description: string;
  title: string;
}

export type ResumeInfoType = {
  name: string;
  title: string;
  email: string;
  phone: string;
  website: string;
  github: string;
  experiences: ExperienceType[];
  projects: ProjectType[];
  skills: ProjectType[];
  education: ProjectType[];
  interests: string;
};

export type ResumeTemplateProps = {
  data: ResumeInfoType
}

const ResumeTemplate = ({data}: ResumeTemplateProps) => {
  return (
    <Base showShell={false}>
      <div>
        <Title>{data.name}</Title>
        <SubTitle>{data.title}</SubTitle>

        <Meta>
          <div>
            <FontAwesomeIcon icon={faEnvelope} />
            <span>{data.email}</span>
          </div>

          <div>
            <FontAwesomeIcon icon={faPhone} />
            <span>{data.phone}</span>
          </div>

          <div>
            <FontAwesomeIcon icon={faGlobe} />
            <span>{data.website}</span>
          </div>

          <div>
            <FontAwesomeIcon icon={faGithub} />
            <span>{data.github}</span>
          </div>
        </Meta>

        <div>
          <h2>Relevant Experience</h2>

          {
            data.experiences.map((item, key) => (
              <ExperienceItem key={key}>
                <span>{item.title} @ {item.company}</span>
                <span>{item.period} // {item.location}</span>
                <ul>
                  {
                    item.highlights.map((highlight, index) => (
                      <li key={index}>{highlight}</li>
                    ))
                  }
                </ul>
              </ExperienceItem>
            ))
          }
        </div>

        <div>
          <h2>Projects</h2>
          {
            data.projects.map((project, index) => (
              <div key={index}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            ))
          }
        </div>

        <div>
          <h2>Skills</h2>
          {
            data.skills.map((skill, index) => (
              <div key={index}>
                <h3>{skill.title}</h3>
                <p>{skill.description}</p>
              </div>
            ))
          }
        </div>

        <div>
          <h2>Education</h2>
          {
            data.education.map((educationItem, index) => (
              <div key={index}>
                <h3>{educationItem.title}</h3>
                <p>{educationItem.description}</p>
              </div>
            ))
          }
        </div>

        <div>
          <h2>Interests</h2>
          {data.interests}
        </div>

      </div>
    </Base>
  );
}

export default ResumeTemplate;
