import React from 'react';
import { shallow } from 'enzyme';

import ErrorModal from './ErrorModal';
import { findByTestAttr } from '../../test/testUtils';

const handleCloseMockFn = jest.fn();
const props = { message: 'non-empty string', handleClose: handleCloseMockFn };

const setup = (props) => {
  return shallow(<ErrorModal {...props}/>);
}

describe('<ErrorModal />', () => {

  it('renders without errors when message prop is non-empty string', () => {
    const wrapper = setup(props);
    const component = findByTestAttr(wrapper, 'component-error-modal');
    expect(component.exists()).toBeTruthy();
  });

  it('returns null when message prop is a empty string', () => {
    props.message = '';
    const wrapper = setup(props);
    const component = findByTestAttr(wrapper, 'component-error-modal');
    expect(component.exists()).toBeFalsy();
  });

  it('closes Modal on click the X button', () => {
    props.message = 'non-empty string';
    const wrapper = setup(props);
    const closeButton = findByTestAttr(wrapper, 'close');
    closeButton.simulate('click');
    expect(handleCloseMockFn).toHaveBeenCalled();
  });

  it('handleClose from default props if not provided', () => {
    let consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const newProps = { message: 'test-error-message' };
    const wrapper = setup(newProps);
    const closeButton = findByTestAttr(wrapper, 'close');
    closeButton.simulate('click');
    expect(consoleSpy).toHaveBeenCalled();
  });

});