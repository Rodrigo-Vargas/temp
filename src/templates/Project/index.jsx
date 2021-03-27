import React from 'react';
import { graphql } from 'gatsby';
import Theme from '../../styles/theme';
import Base from '../Base';
import { Container } from '../../components/Grid';
import GlobalStyles from '../../styles/global';

import { Title } from './styles';

const ProjectTemplate = ({ data }) => {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;

  return (
    <Theme>
      <GlobalStyles />
      <Base>
        <Container>
          <div>
            <Title>{frontmatter.title}</Title>
            <div
              className="blog-post-content"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </Container>
      </Base>
    </Theme>
  );
};

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

export default ProjectTemplate;
