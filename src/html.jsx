/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-danger */
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

const HTML = ({
  body, headComponents, preBodyComponents, postBodyComponents,
}) => (
  <html lang="EN">
    <head />
    {headComponents}
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
