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
  const imagePaths = data.images;
  const images = [];

  imagePaths?.forEach(imagePath => {
    images.push(`/images/projects/${realSlug}/${imagePath}`);
  });

  return { slug: realSlug, frontmatter: { ...data, cover, images }, content };
}

export function getNextProjectBySlug(slug) {
  const allProjects = getAllProjects();
  let nextSlug = '';
  let nextSlugIndex = -1;

  for (let x = 0; x < allProjects.length; x++) {
    if (allProjects[x].slug == slug)
    {
      nextSlugIndex = x + 1;
      break;
    }
  }

  nextSlug = allProjects[nextSlugIndex].slug;

  return getProjectBySlug(nextSlug);
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
