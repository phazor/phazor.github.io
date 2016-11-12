import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import MenuItem from './MenuItem';

it('component shallow renders with no errors', () => {
  const wrapper = shallow(<MenuItem />);
});

it('Clicking on MenuItem calls handleClick method', () => {
  const spy = jasmine.createSpy();
  const wrapper = shallow(<MenuItem handleClick={spy}/>);
  wrapper.find('Link').simulate('click');
  expect(spy).toHaveBeenCalled();
});
