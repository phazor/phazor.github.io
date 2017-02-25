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
