import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import DeviceReading from './DeviceReading';
import { findByTestAttr, storeFactory } from './../../test/testUtils';
import actionCreators from './../../store/device/actionCreators';
import { DEVICE_READING_STATUS_TOGGLE_SUCCESS } from '../../store/device/actionTypes';

const setup = (props, store) => {
  return mount(
    <Provider store={store}>
      <DeviceReading {...props}/>
    </Provider>
  );
}

describe('<DeviceReading />', () => {
  let wrapper;
  let store;
  let currentTimestamp = new Date();
  const props = {
    data: {
      name: 'test-reading-name',
      value: 100,
      unit: 'm/s2',
      timestamp: currentTimestamp.getTime(),
      active: true
    }
  }
  beforeEach(() => {
    store = storeFactory({});
    wrapper = setup(props, store);
  });

  it('renders without errors', () => {
    const component = findByTestAttr(wrapper, 'component-device-reading');
    expect(component.exists()).toBeTruthy();
  });

  it('has correct values in the correct places taken from the props', () => {
    const readingName = findByTestAttr(wrapper, 'reading-name');
    const status = findByTestAttr(wrapper, 'status');
    const timestamp = findByTestAttr(wrapper, 'timestamp');
    const value = findByTestAttr(wrapper, 'value');
    expect(readingName.text()).toBe('test-reading-name');
    expect(status.hasClass('green-dot')).toBeTruthy();
    expect(timestamp.text()).toBe(currentTimestamp.toString());
    expect(value.text()).toBe('100 m/s2');
  });

  it('dispatches toggle device status action to the redux store on clicking toggle button', () => {
    const toggleActionSpy = jest.spyOn(actionCreators, 'toggleDeviceReadingStatus');
    const toggleButton = findByTestAttr(wrapper, 'toggle-button');
    toggleButton.simulate('click', { target: {}});
    expect(toggleActionSpy).toHaveBeenCalled();
  });

});

it('check red-dot class gets added for status when device reading is inactive', () => {
  let store = storeFactory({});
  let currentTimestamp = new Date();
  const props = {
    data: {
      name: 'test-inactive-reading-name',
      value: 100,
      unit: 'm/s2',
      timestamp: currentTimestamp.getTime(),
      active: false
    }
  }
  const wrapper = setup(props, store);
  const status = findByTestAttr(wrapper, 'status');
  expect(status.hasClass('red-dot')).toBeTruthy();
});
