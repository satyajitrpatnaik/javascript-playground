import * as actionTypes from './actionTypes';

const initialState = {
  readings: [],
  loading: false,
  errorMessage: ''
};

const deviceReducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.FETCH_DEVICE_READINGS_PENDING:
      return {
        ...state,
        loading: true,
        errorMessage: ''
      }
    case actionTypes.FETCH_DEVICE_READINGS_FAILED:
      return {
        ...state,
        loading: false,
        errorMessage: 'Device readings could not be fetched. Please reload the page.'
      }
    case actionTypes.FETCH_DEVICE_READINGS_SUCCESS:
      return {
        ...state,
        readings: action.payload.deviceReadings,
        loading: false,
        errorMessage: ''
      }
    case actionTypes.DEVICE_READING_STATUS_TOGGLE_PENDING:
      return {
        ...state,
        loading: true,
        errorMessage: ''
      }
    case actionTypes.DEVICE_READING_STATUS_TOGGLE_FAILED:
      return {
        ...state,
        loading: false,
        errorMessage: 'Device Reading Status Toggle Failed. Please Retry!'
      }
    case actionTypes.DEVICE_READING_STATUS_TOGGLE_SUCCESS:
      let toggledDeviceReading = { ...state.readings.find(reading => reading.name === action.payload.deviceReading.name) };
      let index = state.readings.findIndex(reading => reading.name === action.payload.deviceReading.name);
      state.readings.splice(index, 1);
      if (action.payload.message === 'OK') {
        toggledDeviceReading.active = !action.payload.deviceReading.active;
      }
      return {
        ...state,
        readings: [
          ...state.readings.slice(0, index),
          toggledDeviceReading,
          ...state.readings.slice(index)
        ],
        loading: false,
        errorMessage: ''
      }
    case actionTypes.RESET_ERROR_MESAGE:
      return {
        ...state,
        errorMessage: ''
      }
    default:
      return state;
  }
}

export default deviceReducer;
