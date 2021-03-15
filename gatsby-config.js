module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'projects',
        path: `${__dirname}/projects/`,
      },
    },
    'gatsby-transformer-remark',
    'gatsby-plugin-styled-components',
  ],
};
