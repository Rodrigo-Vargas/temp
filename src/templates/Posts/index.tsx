import React from 'react';
import GlobalStyles from '@styles/global';
import Base from '@templates/Base';
import ThemeProvider from '@styles/theme-provider';
import { Container } from '@components/Grid';
import { Row } from '@components/Grid';

import { CardCol, CardTitle, Excerpt, PostCard } from './styles';

interface PostsTemplateProps {
  items: [
    {
      node: {
        fields: {
          slug: string;
        };
        frontmatter: {
          categories: Array<string>;
          excerpt: string;
          title: string;
        };
      };
    }
  ];
}

const PostsTemplate: React.FC<PostsTemplateProps> = ({ items }) => (
  <ThemeProvider>
    <GlobalStyles />
    <Base>
      <Container>
        <Row>
          {items.map(item => (
            <CardCol key={item.node.frontmatter.title}>
              <PostCard href={`/blog${item.node.fields.slug}`}>
                <CardTitle>{item.node.frontmatter.title}</CardTitle>
                <Excerpt>{item.node.frontmatter.excerpt}</Excerpt>
              </PostCard>
            </CardCol>
          ))}
        </Row>
      </Container>
    </Base>
  </ThemeProvider>
);

export default PostsTemplate;
