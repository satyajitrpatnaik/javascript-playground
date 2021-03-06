import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const ErrorModal = ({ message, handleClose }) => {
  if (message && message.length > 0) {
    return (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={handleClose}>&times;</span>
          <p>{message}</p>
        </div>
      </div>
    );
  }
  return null;
}

ErrorModal.propTypes = {
  message: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired
}

ErrorModal.defaultProps = {
  message: '',
  handleClose: () => {
    console.log('handler is missing.');
  }
}

export default ErrorModal;
