import React from 'react';
import { graphql } from 'gatsby';

import PostsTemplate from '../templates/Posts';

interface PostsPageProps {
  data: {
    allMarkdownRemark: {
      edges: [
        {
          node: {
            fields: {
              slug: string;
            };
            frontmatter: {
              excerpt: string;
              title: string;
            };
          };
        }
      ];
    };
  };
}

const Posts: React.FC<PostsPageProps> = ({ data }) => (
  <PostsTemplate items={data.allMarkdownRemark.edges} />
);

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/posts/" } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            excerpt
            title
          }
        }
      }
    }
  }
`;

export default Posts;
