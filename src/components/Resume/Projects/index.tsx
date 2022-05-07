import { SectionTitle } from 'templates/Resume/styles';
import { Description, Title } from '../Skill/style';

const Projects = ({data}) => (
  <div>
    <SectionTitle>Projects</SectionTitle>
    {
      data.projects.map((project, index) => (
        <div key={index}>
          <Title>{project.title}</Title>
          <Description>{project.description}</Description>
        </div>
      ))
    }
  </div>
)

export default Projects;
