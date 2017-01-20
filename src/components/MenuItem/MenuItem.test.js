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

it('Internal routes create Link components', () => {
  const wrapper = shallow(<MenuItem to="/hello" />);
  expect(wrapper.find('Link').length).toEqual(1);
  expect(wrapper.find({ to: '/hello' }).length).toEqual(1);
});

it('External links are converted into <a/> tags', () => {
  const wrapper = shallow(<MenuItem href="https://test.com" />);
  expect(wrapper.find({ href: 'https://test.com' }).length).toEqual(1);
});
//
it('External links open in a new tab/window', () => {
    const wrapper = shallow(<MenuItem href="https://test.com" />);
    expect(wrapper.find({ target: '_blank' }).length).toEqual(1);
});
