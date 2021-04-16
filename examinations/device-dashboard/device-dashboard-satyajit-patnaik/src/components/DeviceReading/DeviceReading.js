import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import actionCreators from '../../store/device/actionCreators';

import './styles.css';

const DeviceReading = (props) => {

  const dispatch = useDispatch();

  const toggle = (deviceReading) => {
    dispatch(actionCreators.toggleDeviceReadingStatus(deviceReading));
  }

  return (
    <div data-test="component-device-reading" className="device-reading">
      <div className="grid-container">
        <div className="grid-item">
          <label>Reading Name: </label>
          <span data-test="reading-name">{props.data.name}</span>
        </div>
        <div className="grid-item">
          <label>Status: </label>
          { 
            props.data.active ? 
              <span data-test="status" className="green-dot"></span> : 
              <span data-test="status" className="red-dot"></span>
          }
        </div>
        <div className="grid-item">
          <label>Timestamp: </label>
          <span data-test="timestamp">{new Date(props.data.timestamp).toString()}</span>
        </div>
        <div className="grid-item">
          <label>Value: </label>
          <span data-test="value">{props.data.value + ' ' + props.data.unit}</span>
        </div>
        <div className="grid-item"></div>
        <div className="grid-item">
          <button data-test="toggle-button" onClick={() => toggle(props.data)}>Toggle Status</button>
        </div>
      </div>
    </div>
  );
}

DeviceReading.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    unit: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    active: PropTypes.bool.isRequired
  }).isRequired
}

DeviceReading.defaultProps = {
  data: {
    name: 'NA',
    value: 0,
    unit: 'NA',
    timestamp: 0,
    active: false
  }
}

export default DeviceReading;
