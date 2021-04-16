import React from 'react';
import { useSelector } from 'react-redux';

import './styles.css';

function counterReducer(state, action) {
  switch(action.type) {
    case 'setNoOfActiveDeviceReadings':
      return {
        ...state,
        noOfActiveDeviceReadings: action.payload
      }
    case 'setNoOfInactiveDeviceReadings':
      return {
        ...state,
        noOfInactiveDeviceReadings: action.payload
      }
    default:
      return state;
  }
}

const Counter = (props) => {

  const devices = useSelector(state => state.device.readings);

  const [ state, dispatch ] = React.useReducer(counterReducer, {
    noOfActiveDeviceReadings: 0,
    noOfInactiveDeviceReadings: 0
  });

  const setNoOfActiveDeviceReadings = (noOfActiveDeviceReadings) => dispatch({
    type: 'setNoOfActiveDeviceReadings',
    payload: noOfActiveDeviceReadings
  });

  const setNoOfInactiveDeviceReadings = (noOfInactiveDeviceReadings) => dispatch({
    type: 'setNoOfInactiveDeviceReadings',
    payload: noOfInactiveDeviceReadings
  });

  React.useEffect(() => {
    setNoOfActiveDeviceReadings(devices.filter(device => device.active).length);
    setNoOfInactiveDeviceReadings(devices.filter(device => device.active === false).length);
  }, [devices]);

  return (
    <div data-test="component-counter" className="counter">
      <div className="counter-grid">
        <div className="counter-grid-item">
          <label>ACTIVE DEVICE READINGS</label>
          <div data-test="active-readings">{state.noOfActiveDeviceReadings}</div>
        </div>
        <div className="counter-grid-item">
          <label>INACTIVE DEVICE READINGS</label>
          <div data-test="inactive-readings">{state.noOfInactiveDeviceReadings}</div>
        </div>
      </div>
    </div>
  );
}

export { counterReducer };
export default Counter;
