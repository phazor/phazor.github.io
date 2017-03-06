import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Home from './Home';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Home />, div);
});

it('contains section element', () => {
  let wrapper = shallow(<Home />);
  expect(wrapper.find('section').length).toEqual(1);
})
