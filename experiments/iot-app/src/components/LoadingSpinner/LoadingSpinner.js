import React from 'react';

import './styles.css';

const LoadingSpinner = ({ open }) => {
  if (open) {
    return <div className="backdrop"></div>
  }
  return null;
}

export default LoadingSpinner;
