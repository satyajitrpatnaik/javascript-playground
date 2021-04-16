import React from 'react';
import { shallow } from 'enzyme';

import LoadingSpinner from './LoadingSpinner';
import { findByTestAttr } from '../../test/testUtils';

const setup = (open) => {
  const wrapper = shallow(<LoadingSpinner open={open}/>);
  return wrapper;
}

describe('<LoadingSpinner />', () => {

  it('renders without errors', () => {
    const wrapper = setup(true);
    const component = findByTestAttr(wrapper, 'component-loading-spinner');
    expect(component.exists()).toBeTruthy();
  });

  it('does not render when open prop is false', () => {
    const wrapper = setup(false);
    const component = findByTestAttr(wrapper, 'component-loading-spinner');
    expect(component.exists()).toBeFalsy();
  });
});
