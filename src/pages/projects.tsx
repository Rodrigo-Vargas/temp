import React from 'react';
import { graphql } from 'gatsby';

import ProjectsTemplate from '../templates/Projects';

interface ProjectsPageProps {
  data: {
    allMarkdownRemark: {
      edges: [
        {
          node: {
            fields: {
              slug: string;
            };
            frontmatter: {
              categories: Array<string>;
              cover: {
                url: string;
              };
              link: string;
              skills: string;
              title: string;
            };
          };
        }
      ];
    };
  };
}

const Projects: React.FC<ProjectsPageProps> = ({ data, ...anotherProps }) => (
  <ProjectsTemplate items={data.allMarkdownRemark.edges} {...anotherProps} />
);

export const query = graphql`
  query {
    allMarkdownRemark {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            categories
            cover {
              publicURL
            }
            link
            skills
            title
          }
        }
      }
    }
  }
`;

export default Projects;
