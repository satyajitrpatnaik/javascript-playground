import { storeFactory } from '../../test/testUtils';
import deviceReducer from './deviceReducer';

describe('deviceReducer', () => {
  const initialState = { readings: [], loading: false, errorMessage: '' };
  it('returns default state when no action is matching', () => {
    const state = deviceReducer(initialState, { type: 'UNAVAILABLE_ACTION' });
    expect(state).toEqual(initialState);
  });

  it('returns changed state when action is matching eg FETCH_DEVICE_READINGS_SUCCESS', () => {
    const newState = deviceReducer(initialState, { 
      type: 'FETCH_DEVICE_READINGS_SUCCESS',
      payload: {
        deviceReadings: [
          { name: 'test-reading', active: true }
        ]
      } 
    });
    expect(newState.readings.length).toBe(1);
  });
});