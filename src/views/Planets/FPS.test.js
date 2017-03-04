import React from 'react';
import FPS from './FPS';
import { shallow } from 'enzyme';

it('renders fps', () => {
  let wrapper = shallow(<FPS />);
});

it('FPS displays fps', () => {
  let wrapper = shallow(<FPS fps={60}/>);
  expect(wrapper.text()).toContain('fps: 60');
});
