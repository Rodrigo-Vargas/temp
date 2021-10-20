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
  items: [
    {
      slug: string;
      frontmatter: {
        categories: Array<string>;
        cover_url: string;
        date: string;
        excerpt: string;
        title: string;
      };
      content: string;
    }
  ];
}

const PostsTemplate: React.FC<PostsTemplateProps> = ({ items }) => (
  <Base>
    <Container>
      <Row>
        {items.map(item => (
            <CardCol key={item.frontmatter.title}>
              <PostCard href={`/blog/${item.slug}`}>
                <CardTitle>{item.frontmatter.title}</CardTitle>
                <Excerpt>{item.frontmatter.excerpt}</Excerpt>
              </PostCard>
            </CardCol>
        ))}
      </Row>
    </Container>
  </Base>
);

export default PostsTemplate;
