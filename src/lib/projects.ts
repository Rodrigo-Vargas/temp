import matter from 'gray-matter';
import fs from 'fs';
import { join } from 'path';

const projectsDirectory = join(process.cwd(), 'content', 'projects')

export function getProjectBySlug(slug) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(projectsDirectory, `${realSlug}/index.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const cover = `/images/projects/${realSlug}/${data.cover}`;

  return { slug: realSlug, frontmatter: { ...data, cover }, content };
}

export function getAllProjects() {
  const slugs = fs.readdirSync(projectsDirectory);
  let projects = slugs.map((slug) => getProjectBySlug(slug));

  projects = projects.sort((a, b) => {
    if (a.slug < b.slug) {
      return 1;
    }
    if (a.slug > b.slug) {
      return -1;
    }

    return 0;
  });

  return projects;
}
