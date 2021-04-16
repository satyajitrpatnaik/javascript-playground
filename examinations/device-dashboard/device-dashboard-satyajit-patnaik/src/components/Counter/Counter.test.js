import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

import Counter, { counterReducer } from './Counter';
import { findByTestAttr, storeFactory } from './../../test/testUtils';
import { fetchDeviceReadingsSuccess } from '../../store/device/actionCreators';

const mockLocalStateDispatch = jest.fn();
const originalUseReducer = React.useReducer;

const setup = (store) => {
  mockLocalStateDispatch.mockClear();
  const mockUseReducer = jest.fn()
    .mockReturnValue([
      { noOfActiveDeviceReadings: 0, noOfInactiveDeviceReadings: 0 },
      mockLocalStateDispatch
    ])
  React.useReducer = mockUseReducer;
  return mount(
    <Provider store={store}>
      <Counter/>
    </Provider>
  ); /** enzyme does not have support for useEffect hook in shallow rendering */
}

describe('<Counter />', () => {
  let store;
  let wrapper;

  
  describe('rendering with mocked useReducer for local state', () => {
    beforeEach(() => {
      store = storeFactory({});
      store.dispatch(fetchDeviceReadingsSuccess([
        { name: 'active-reading', active: true },
        { name: 'inactive-reading', active: false }
      ]));
      wrapper = setup(store);
    });

    it('renders without error', () => {
      const component = findByTestAttr(wrapper, 'component-counter');
      expect(component.exists()).toBeTruthy();
    });
  
    it('updates local state using the dispatch function in the useEffect hook', () => {
      expect(mockLocalStateDispatch).toHaveBeenCalledTimes(2);
    });

  });

  describe('shows correct counters for device readings', () => {
    beforeEach(() => {
      store = storeFactory({});
      store.dispatch(fetchDeviceReadingsSuccess([
        { name: 'active-reading', active: true },
        { name: 'inactive-reading', active: false }
      ]));
      React.useReducer = originalUseReducer;
      wrapper = mount(
        <Provider store={store}>
          <Counter />
        </Provider>
      );
    });
    
    it('shows correct number of active readings', () => {
      const component = findByTestAttr(wrapper, 'active-readings');
      expect(component.text()).toBe(String(1));
    });

    it('shows correct number of inactive readings', () => {
      const component = findByTestAttr(wrapper, 'inactive-readings');
      expect(component.text()).toBe(String(1));
    });
  });
  
});

it('counterReducer sends default state when no action is matching', () => {
  const initialState = { defaultState: 'defaultState' };
  const state = counterReducer(initialState, { type: 'nonMatchingAction' });
  expect(state).toEqual(initialState);
});