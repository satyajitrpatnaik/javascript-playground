import { combineReducers } from 'redux';
import deviceReducer from './device/deviceReducer';

const rootReducer = combineReducers({
  device: deviceReducer
});

export default rootReducer;
