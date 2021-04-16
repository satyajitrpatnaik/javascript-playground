import moxios from 'moxios';

import * as actionCreators from './actionCreators';
import * as actionTypes from './actionTypes';
import axiosInstance from './../../utils/axiosInstance';
import { storeFactory } from './../../test/testUtils';
describe('device action creators', () => {
  let store;

  beforeEach(() => {
    store = storeFactory({});
    moxios.install(axiosInstance);
  });

  afterEach(() => {
    moxios.uninstall(axiosInstance);
  });

  describe('fetchDeviceReadings action creator', () => {
    it('adds device readings to the state', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: { data: [
            { 
              name: 'test-reading-name',
              value: 100,
              unit: 'test-unit',
              timestamp: 10000000000,
              active: false
            }
          ]}
        });
      });
      return store.dispatch(actionCreators.fetchDeviceReadings())
        .then(() => {
          const newState = store.getState();
          expect(newState.device.readings.length).toBe(1);
        });
    });

    it('does not fetch device readings and fails with errorMessage set in the state', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: 'fetching device readings failed'
        });
      });
      return store.dispatch(actionCreators.fetchDeviceReadings())
        .then(() => {
          const newState = store.getState();
          expect(newState.device.errorMessage).not.toBe('');
        });
    });
  });
  
  describe('fetchDeviceReadingsSuccess action creator', () => {
    it('returns FETCH_DEVICE_READINGS_SUCCESS action type', () => {
      const action = actionCreators.fetchDeviceReadingsSuccess([]);
      expect(action).toEqual({ type: actionTypes.FETCH_DEVICE_READINGS_SUCCESS, payload: { deviceReadings: [] }});
    });
  });
  
  describe('fetchDeviceReadingsPending action creator', () => {
    it('returns FETCH_DEVICE_READINGS_PENDING action type', () => {
      const action = actionCreators.fetchDeviceReadingsPending();
      expect(action).toEqual({ type: actionTypes.FETCH_DEVICE_READINGS_PENDING });
    });
  });
  
  describe('fetchDeviceReadingsFailed action creator', () => {
    it('returns FETCH_DEVICE_READINGS_FAILED action type', () => {
      const action = actionCreators.fetchDeviceReadingsFailed();
      expect(action).toEqual({ type: actionTypes.FETCH_DEVICE_READINGS_FAILED });
    });
  });
  
  describe('toggleDeviceReadingStatus action creator', () => {
    it('toggles active status of the device reading name provided as input', () => {
      store.dispatch(actionCreators.fetchDeviceReadingsSuccess([{ name: 'test-reading-name', active: false }]));
      moxios.wait(() => {
        let request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: 'OK'
        });
      });
      return store.dispatch(actionCreators.toggleDeviceReadingStatus({ name: 'test-reading-name', active: false }))
        .then(() => {
          const newState = store.getState();
          expect(newState.device.readings[0].active).toBeTruthy();
        });
    });

    it('does not toggle device reading status when error occurs', () => {
      moxios.wait(() => {
        let request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: 'device status toggle patch failed'
        });
      });
      return store.dispatch(actionCreators.toggleDeviceReadingStatus({ name: 'test-reading-name', active: false }))
        .then(() => {
          const newState = store.getState();
          expect(newState.device.readings.errorMessage).not.toBe('');
        });
    });
  });
  
  describe('toggleDeviceReadingStatusSuccess action creator', () => {
    it('returns FETCH_DEVICE_READINGS_FAILED action type', () => {
      const action = actionCreators.toggleDeviceReadingStatusSuccess({}, 'test-message');
      expect(action).toEqual({ 
        type: actionTypes.DEVICE_READING_STATUS_TOGGLE_SUCCESS,
        payload: { deviceReading: {}, message: 'test-message' }
       });
    });
  });
  
  describe('toggleDeviceReadingStatusPending action creator', () => {
    it('returns DEVICE_READING_STATUS_TOGGLE_PENDING action type', () => {
      const action = actionCreators.toggleDeviceReadingStatusPending();
      expect(action).toEqual({ 
        type: actionTypes.DEVICE_READING_STATUS_TOGGLE_PENDING
       });
    });
  });
  
  describe('toggleDeviceReadingStatusFailed action creator', () => {
    it('returns DEVICE_READING_STATUS_TOGGLE_FAILED action type', () => {
      const action = actionCreators.toggleDeviceReadingStatusFailed();
      expect(action).toEqual({ 
        type: actionTypes.DEVICE_READING_STATUS_TOGGLE_FAILED
       });
    });
  });
  
  describe('resetErrorMessage action creator', () => {
    it('returns RESET_ERROR_MESSAGE action type', () => {
      const action = actionCreators.resetErrorMessage();
      expect(action).toEqual({ 
        type: actionTypes.RESET_ERROR_MESSAGE
       });
    });

    it('resets errorMessage state', () => {
      store.dispatch(actionCreators.resetErrorMessage());
      const newState = store.getState();
      expect(newState.device.errorMessage).toBe('');
    });
  });
})




