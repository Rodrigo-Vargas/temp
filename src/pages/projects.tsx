import { getAllProjects } from 'lib/projects';
import ProjectsTemplate, { ProjectsTemplateProps } from 'templates/Projects';

export default function ProjectsPage(props: ProjectsTemplateProps) {
  return <ProjectsTemplate {...props} />
}

export async function getStaticProps() {
  const items = getAllProjects();

  return {
    props: { items },
  }
}
