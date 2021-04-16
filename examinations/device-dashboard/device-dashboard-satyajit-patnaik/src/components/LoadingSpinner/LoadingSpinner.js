import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const LoadingSpinner = ({ open }) => {
  if (open) {
    return <div data-test="component-loading-spinner" className="backdrop"></div>
  }
  return null;
}

LoadingSpinner.propTypes = {
  open: PropTypes.bool.isRequired
}

LoadingSpinner.defaultProps = {
  open: false
}

export default LoadingSpinner;
