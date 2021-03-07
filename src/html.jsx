/* eslint-disable react/no-danger */
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

const HTML = ({ body }) => (
  <html lang="EN">
    <body>
      <div
        key="body"
        id="___gatsby"
        dangerouslySetInnerHTML={{ __html: body }}
      />
    </body>
  </html>
);

HTML.defaultProps = {
  body: '',
};

HTML.propTypes = {
  body: PropTypes.string,
};

export default HTML;
