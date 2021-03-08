/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-danger */
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

const HTML = ({
  body, headComponents, preBodyComponents, postBodyComponents,
}) => (
  <html lang="EN">
    <head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600&amp;display=swap" rel="stylesheet" />
      {headComponents}
    </head>
    <body>
      {preBodyComponents}
      <div
        key="body"
        id="___gatsby"
        dangerouslySetInnerHTML={{ __html: body }}
      />
      {postBodyComponents}
    </body>
  </html>
);

HTML.defaultProps = {
  body: '',
  headComponents: [],
  preBodyComponents: [],
  postBodyComponents: [],
};

HTML.propTypes = {
  headComponents: PropTypes.array,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
};

export default HTML;
