import { getAllPosts } from 'lib/blog';
import PostsTemplate, { PostsTemplateProps } from '../templates/Posts';

export default function PostsPage(props: PostsTemplateProps) {
  const filteredItems = props.items.filter(
    post => post.frontmatter.locale == props.locale
  );

  return <PostsTemplate items={[...filteredItems]} locale={props.locale} />
}

export async function getStaticProps({ locale }) {
  const items = getAllPosts();

  return {
    props: {
      items,
      locale
    },
  }
}