/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: 'pages' });
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
  }
};

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;
  const projectTemplate = require.resolve('./src/templates/Project/index.tsx');
  const postTemplate = require.resolve('./src/templates/Post/index.tsx');

  const result = await graphql(`
    {
      posts: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/posts/" } }
        sort: { order: DESC, fields: [frontmatter___date] }
      ) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }

      projects: allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        filter: { fileAbsolutePath: { regex: "/projects/" } }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              categories
              excerpt
              images {
                publicURL
              }
              link
              sourceUrl
              skills
              title
            }
            html
          }
          next {
            frontmatter {
              cover {
                publicURL
              }
              title
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `);
  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.');
    return;
  }

  const projects = result.data.projects.edges;

  projects.forEach(({ node, next }) => {
    createPage({
      path: `projects${node.fields.slug}`,
      component: projectTemplate,
      context: {
        next,
        node,
      },
    });
  });

  const posts = result.data.posts.edges;

  posts.forEach(({ node, next }) => {
    createPage({
      path: `blog${node.fields.slug}`,
      component: postTemplate,
      context: {
        slug: node.fields.slug
      },
    });
  });
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@templates': path.resolve(__dirname, 'src/templates'),
        '@styles': path.resolve(__dirname, 'src/styles'),
        '@components': path.resolve(__dirname, 'src/components'),
      },
    },
  });
};
