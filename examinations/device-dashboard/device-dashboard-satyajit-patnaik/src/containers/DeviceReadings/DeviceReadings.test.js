import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

import DeviceReadings from './DeviceReadings';
import { findByTestAttr, storeFactory } from './../../test/testUtils';

const setup = (store) => {
  return mount(
    <Provider store={store}>
      <DeviceReadings />
    </Provider>
  );
}

describe('<DeviceReadings />', () => {
  let mockSetSearchStringFn = jest.fn();
  let wrapper;

  beforeEach(() => {
    mockSetSearchStringFn.mockClear();
    React.useState = jest.fn(() => [ '', mockSetSearchStringFn ]);
    const store = storeFactory({});
    wrapper = setup(store);
  });

  it('renders without errors', () => {
    const component = findByTestAttr(wrapper, 'component-device-readings');
    expect(component.exists()).toBeTruthy();
  });

  it('sets search string in local state on text change event in search input', () => {
    const searchInput = findByTestAttr(wrapper, 'search-input');
    /** testing debounced functionality */
    return new Promise(resolve => {
      searchInput.simulate('change', { target: { value: '    BETA    ' }});
      setTimeout(resolve, 501);
    }).then(() => {
      expect(mockSetSearchStringFn).toHaveBeenCalledWith('beta');
    });
  });
})