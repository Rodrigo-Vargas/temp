import React from 'react';
import { graphql } from 'gatsby';

import Base from '@templates/Base';
import ThemeProvider from '@styles/theme-provider';
import GlobalStyles from '@styles/global';
import { Container } from '@components/Grid';

import { Article } from './styles';

interface TemplateProps {
  data: {
    markdownRemark: {
      frontmatter: {
        title: string;
      };
      html: string;
    };
  };
}

const PostTemplate: React.FC<TemplateProps> = ({ data }) => (
  <ThemeProvider>
    <GlobalStyles />
    <Base>
      <Container>
        <Article>
          <h1>{data.markdownRemark.frontmatter.title}</h1>
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
          />
        </Article>
      </Container>
    </Base>
  </ThemeProvider>
);

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;

export default PostTemplate;
