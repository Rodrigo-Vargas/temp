import React from 'react';
import { graphql } from 'gatsby';

import ProjectsTemplate from '../templates/Projects';

const Projects = ({ data, ...anotherProps }) => (
  <ProjectsTemplate items={data.allMarkdownRemark.edges} {...anotherProps} />
);

export const query = graphql`
  query {
    allMarkdownRemark {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            link
            skills
            cover {
              url
            }
          }
        }
      }
    }
  }
`;

export default Projects;
