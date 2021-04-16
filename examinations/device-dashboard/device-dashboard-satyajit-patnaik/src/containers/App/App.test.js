import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

import App from './App';
import { findByTestAttr, storeFactory } from './../../test/testUtils';
import actionCreators from '../../store/device/actionCreators';

const setup = () => {
  const store = storeFactory({});
  // useEffect hook does not run in shallow rendering, hence mount is being used, despite performance hit
  return mount(
    <Provider store={store}>
      <App />
    </Provider>
  );
}

describe('<App />', () => {
  let wrapper;
  let spy;

  beforeEach(() => {
    spy = jest.spyOn(actionCreators, 'fetchDeviceReadings');
    wrapper = setup();
  });

  it('renders without errors', () =>{
    const component = findByTestAttr(wrapper, 'component-app');
    expect(component.exists()).toBeTruthy();
  });

  it('fetchDeviceReadings action is dispatched on mount', () => {
    expect(spy).toHaveBeenCalled();
  });

});