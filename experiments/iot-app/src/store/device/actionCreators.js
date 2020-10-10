import axiosInstance from './../../utils/axiosInstance';
import * as actionTypes from './actionTypes';

export const fetchDeviceReadings = () => {
  return (dispatch, getState) => {
    dispatch(fetchDeviceReadingsPending());
    axiosInstance.get('/devices')
      .then(response => {
        if (response.status === 200) {
          dispatch(fetchDeviceReadingsSuccess(response.data.data));
        }
      })
      .catch(err => {
        dispatch(fetchDeviceReadingsFailed());
      })
  }
}

export const fetchDeviceReadingsSuccess = (deviceReadings) => {
  return {
    type: actionTypes.FETCH_DEVICE_READINGS_SUCCESS,
    payload: { deviceReadings }
  }
}

export const fetchDeviceReadingsPending = () => {
  return {
    type: actionTypes.FETCH_DEVICE_READINGS_PENDING
  }
}

export const fetchDeviceReadingsFailed = () => {
  return {
    type: actionTypes.FETCH_DEVICE_READINGS_FAILED
  }
}

export const toggleDeviceReadingStatus = (deviceReading) => {
  return (dispatch, getState) => {
    dispatch(toggleDeviceReadingStatusPending());
    axiosInstance.patch(`/devices/${deviceReading.name}?active=${!deviceReading.active}`)
      .then(response => {
        if (response.status === 200) {
          dispatch(toggleDeviceReadingStatusSuccess(deviceReading, response.data));
        }
      })
      .catch(err => {
        dispatch(toggleDeviceReadingStatusFailed());
      });
  }
}

export const toggleDeviceReadingStatusSuccess = (deviceReading, message) => {
  return {
    type: actionTypes.DEVICE_READING_STATUS_TOGGLE_SUCCESS,
    payload: { deviceReading, message }
  }
}

export const toggleDeviceReadingStatusPending = () => {
  return {
    type: actionTypes.DEVICE_READING_STATUS_TOGGLE_PENDING
  }
}

export const toggleDeviceReadingStatusFailed = () => {
  return {
    type: actionTypes.DEVICE_READING_STATUS_TOGGLE_FAILED
  }
}

export const resetErrorMessage = () => {
  return {
    type: actionTypes.RESET_ERROR_MESAGE
  }
}