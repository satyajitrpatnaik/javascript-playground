import React from 'react';
import { useSelector } from 'react-redux';

import './styles.css';

const Counter = (props) => {

  const devices = useSelector(state => state.device.readings);
  const [ noOfActiveDeviceReadings, setNoOfActiveDeviceReadings ] = React.useState(0);
  const [ noOfInactiveDeviceReadings, setNoOfInactiveDeviceReadings ] = React.useState(0);

  React.useEffect(() => {
    setNoOfActiveDeviceReadings(devices.filter(device => device.active).length);
    setNoOfInactiveDeviceReadings(devices.filter(device => device.active === false).length);
  }, [devices]);

  return (
    <div className="counter">
      <div className="counter-grid">
        <div className="counter-grid-item">
          <label>ACTIVE DEVICE READINGS</label>
          <div>{noOfActiveDeviceReadings}</div>
        </div>
        <div className="counter-grid-item">
          <label>INACTIVE DEVICE READINGS</label>
          <div>{noOfInactiveDeviceReadings}</div>
        </div>
      </div>
    </div>
  );
}

export default Counter;
