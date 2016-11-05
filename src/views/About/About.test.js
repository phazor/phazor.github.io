import React from 'react';
import ReactDOM from 'react-dom';
import About from './About';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<About />, div);
});

it('About contains an iframe', () => {
  const component = shallow(
    <About />
  );

  expect(component.has('iframe')).toBe(true);
});

// TODO
// it ('About iframe fetches content', () => {});
