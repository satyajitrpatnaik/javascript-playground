import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { toggleDeviceReadingStatus } from '../../store';

import './styles.css';

const DeviceReading = (props) => {

  const dispatch = useDispatch();

  const toggle = (deviceReading) => {
    dispatch(toggleDeviceReadingStatus(deviceReading));
  }

  return (
    <div className="device-reading">
      <div className="grid-container">
        <div className="grid-item">
          <label>Reading Name: </label>
          <span>{props.data.name}</span>
        </div>
        <div className="grid-item">
          <label>Status: </label>
          { props.data.active ? <span className="green-dot"></span> : <span className="red-dot"></span> }
        </div>
        <div className="grid-item">
          <label>Timestamp: </label>
          <span>{new Date(props.data.timestamp).toString()}</span>
        </div>
        <div className="grid-item">
          <label>Value: </label>
          <span>{props.data.value + ' ' + props.data.unit}</span>
        </div>
        <div className="grid-item"></div>
        <div className="grid-item">
          <button onClick={() => toggle(props.data)}>Toggle Status</button>
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
