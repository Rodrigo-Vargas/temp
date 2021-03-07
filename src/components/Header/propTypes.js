// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

const headerPropType = PropTypes.arrayOf(PropTypes.shape({
  title: PropTypes.string,
  href: PropTypes.string,
}));

export default headerPropType;
