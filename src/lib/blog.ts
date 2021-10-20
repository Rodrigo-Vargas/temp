import matter from 'gray-matter'
import { parseISO, format } from 'date-fns'
import fs from 'fs'
import { join } from 'path'

const postsDirectory = join(process.cwd(), 'content', 'posts')

export function getPostBySlug(slug) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const parsedDate = parseISO(data.date);

  const date = format(parsedDate, 'dd/MM/yyyy');

  return { slug: realSlug, frontmatter: { ...data, date }, content };
}

export function getAllPosts() {
  const slugs = fs.readdirSync(postsDirectory);
  let posts = slugs.map((slug) => getPostBySlug(slug));

  posts = posts.sort((a, b) => {
    if (a.slug < b.slug) {
      return 1;
    }
    if (a.slug > b.slug) {
      return -1;
    }

    return 0;
  });

  return posts;
}
