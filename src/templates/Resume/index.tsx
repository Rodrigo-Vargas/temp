import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';


import Base from 'templates/Base';
import Experience from 'components/Resume/Experience';
import Projects from 'components/Resume/Projects';
import { Content, Meta, SectionTitle, SideNav, SubTitle, Title } from './styles';
import { FluidContainer, Row } from 'components/Grid';
import Education from 'components/Resume/Education';
import Skill from 'components/Resume/Skill';
import { Description } from 'components/Resume/Skill/style';

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
    <Base hideShell={true}>
      <FluidContainer>
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
        <Row>
          <Content>
            <Experience data={data} />

            <div>
              <SectionTitle>Interests</SectionTitle>
              <Description>{data.interests}</Description>
            </div>
          </Content>

          <SideNav>
            <Skill data={data} />

            <Education data={data} />

            <Projects data={data} />

          </SideNav>
        </Row>
      </FluidContainer>
    </Base>
  );
}

export default ResumeTemplate;
