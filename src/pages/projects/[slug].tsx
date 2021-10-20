import remark from 'remark'
import html from 'remark-html'

import {
  getAllProjects,
  getNextProjectBySlug,
  getProjectBySlug
} from 'lib/projects';

import ProjectTemplate, { ProjectTemplateProps } from 'templates/Project';

export default function Index(props: ProjectTemplateProps) {
  return <ProjectTemplate {...props} />
}

export async function getStaticProps({ params }) {
  const project = getProjectBySlug(params.slug);
  const next = getNextProjectBySlug(params.slug);
  const markdown = await remark()
    .use(html)
    .process(project.content || '');

  const content = markdown.toString();

  return {
    props: {
      node: {
        ...project,
        content
      },
      next
    },
  }
}

export async function getStaticPaths() {
  const projects = getAllProjects()

  return {
    paths: projects.map((project) => {
      return {
        params: {
          slug: project.slug,
        },
      }
    }),
    fallback: false,
  }
}
