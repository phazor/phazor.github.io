import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Planets from './Planets';
import { Provider } from 'react-redux';

it('renders in a non-WebGL context without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Planets />
  , div);
});

it('renders a wrapper div with the "Planets" className', () => {
  let wrapper = shallow(<Planets />);
  expect(wrapper.find('.Planets').length).toEqual(1);
});

it('renders an error message when no WebGL exists', () => {
  // Assumes that there is no WebGL in Phantom/CI
  let wrapper = shallow(<Planets />);
  expect(wrapper.find('canvas').length).toEqual(0);
  expect(wrapper.text()).toContain('Error: WebGL Not Found');
});
