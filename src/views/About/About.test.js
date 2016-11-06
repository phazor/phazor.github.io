import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import About from './About';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<About />, div);
});

it('About contains an iframe', () => {
  const component = shallow(<About />);
  expect(component.find('#iframe').length).toBe(1);
});

it('About iframe contains link to about-me', () => {
  const component = shallow(<About />);
  expect(component.find('#iframe').prop('src')).toBe('https://phazor.github.io/about-me/');
});

it('componentDidMount should run without error', () => {
  const spy = spyOn(About.prototype, "componentDidMount");
  const wrapper = mount(<About />);
  expect(spy.calls.count()).toEqual(1);
});

// TODO
// it ('About iframe fetches content', () => {});
