import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { debounce } from 'lodash';

import DeviceReading from '../../components/DeviceReading/DeviceReading';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../../components/ErrorModal/ErrorModal';
import actionCreators from './../../store/device/actionCreators';

import './styles.css';

const DeviceReadings = (props) => {

  const deviceReadings = useSelector(state => state.device.readings);
  const loading = useSelector(state => state.device.loading);
  const errorMessage = useSelector(state => state.device.errorMessage);
  const dispatch = useDispatch()

  const [ searchString, setSearchString ] = React.useState('');

  const handleSearch = debounce((input) => {
    setSearchString(input.trim().toLowerCase());
  }, 500);

  const handleCloseModal = () => {
    dispatch(actionCreators.resetErrorMessage());
  }

  return (
    <div data-test="component-device-readings" className="device-readings">
      <LoadingSpinner open={loading}/>
      <ErrorModal message={errorMessage} handleClose={handleCloseModal}/>
      <div className="input-div" align="left">
        <label style={{ fontWeight: 'bold' }}>Search by Reading Name: </label>
        <input data-test="search-input" type="text" onChange={event => handleSearch(event.target.value)}/>
      </div>
      <span style={{ float: 'right' }}>
        <label> <span className="green-dot"/> Active Device Reading </label>
        <label> <span className="red-dot"/> Inactive Device Reading </label>
      </span>
      {
        deviceReadings.filter(reading => {
          return reading.name.toLowerCase()
            .includes(searchString);
          })
          .map((reading, index) => <DeviceReading key={index} data={reading}/>)
      }
    </div>
  );
}

export default DeviceReadings;
