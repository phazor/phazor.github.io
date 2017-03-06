import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import MenuItem from './MenuItem';

it('shallow renders with no errors', () => {
  const wrapper = shallow(<MenuItem />);
});

it('calls handleClick method when clicking on MenuItem', () => {
  const spy = jasmine.createSpy();
  const wrapper = shallow(<MenuItem handleClick={spy}/>);
  wrapper.find('Link').simulate('click');
  expect(spy).toHaveBeenCalled();
});

it('creates Link components for Internal routes', () => {
  const wrapper = shallow(<MenuItem to="/hello" />);
  expect(wrapper.find('Link').length).toEqual(1);
  expect(wrapper.find({ to: '/hello' }).length).toEqual(1);
});

it('converts external links into <a/> tags', () => {
  const wrapper = shallow(<MenuItem href="https://test.com" />);
  expect(wrapper.find({ href: 'https://test.com' }).length).toEqual(1);
});

it('opens external links  in a new tab/window', () => {
    const wrapper = shallow(<MenuItem href="https://test.com" />);
    expect(wrapper.find({ target: '_blank' }).length).toEqual(1);
});
