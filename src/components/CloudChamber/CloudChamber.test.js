import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import CloudChamber from './CloudChamber';
import EmbedComponent from '../EmbedComponent/EmbedComponent';

it('Cloud Chamber renders with no errors', () => {
  const wrapper = shallow(<CloudChamber />);
});

it('CloudChamber loads CloudPen html component', () => {
  const wrapper = shallow(<CloudChamber />);
  expect(wrapper.find(EmbedComponent)).toHaveLength(1);
});
