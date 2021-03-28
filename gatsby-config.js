module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'projects',
        path: `${__dirname}/content/projects/`,
      },
    },
    'gatsby-transformer-remark',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-transition-link',
    {
      resolve: 'gatsby-plugin-typescript',
      options: {
        isTSX: true, // defaults to false
        jsxPragma: 'jsx', // defaults to "React"
        allExtensions: true, // defaults to false
      },
    },
  ],
};
