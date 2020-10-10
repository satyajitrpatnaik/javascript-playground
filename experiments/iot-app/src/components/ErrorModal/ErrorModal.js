import React from 'react';

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

export default ErrorModal;
