import { getAllPosts } from 'lib/blog';
import PostsTemplate, { PostsTemplateProps } from '../templates/Posts';

export default function PostsPage(props: PostsTemplateProps) {
  return <PostsTemplate { ...props } />
}

export async function getStaticProps() {
  const items = getAllPosts();

  return {
    props: { items },
  }
}
