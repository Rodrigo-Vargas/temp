import { useRouter } from 'next/router';

import Base from 'templates/Base';
import { Container } from 'components/Grid';
import { Row } from 'components/Grid';

import {
  CardCol,
  CardTitle,
  Excerpt,
  PostCard
} from './styles';

export type PostsTemplateProps = {
  items: Post[];
  locale: string;
}

type Post = {
  slug: string;
  frontmatter: {
    categories: Array<string>;
    cover_url: string;
    date: string;
    excerpt: string;
    locale?: string;
    title: string;
  };
  content: string;
}

const PostsTemplate: React.FC<PostsTemplateProps> = ({ items }) => {
  const { defaultLocale } = useRouter();

  return (
    <Base>
      <Container>
        <Row>
          {items.map(item => {
            const localizedUrl =
              item.frontmatter.locale == defaultLocale ? '' : `${item.frontmatter.locale}/`;

            const postUrl = `/${localizedUrl}blog/${item.slug}`;

            return (
              <CardCol key={item.frontmatter.title}>
                <PostCard href={postUrl}>
                  <CardTitle>{item.frontmatter.title}</CardTitle>
                  <Excerpt>{item.frontmatter.excerpt}</Excerpt>
                </PostCard>
              </CardCol>
          )
          })}
        </Row>
      </Container>
    </Base>
  );
}

export default PostsTemplate;
