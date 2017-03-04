import React from 'react';
import Overlay from './Overlay';
import { shallow } from 'enzyme';

it('shallow renders overlay with no errors', () => {
  let wrapper = shallow(<Overlay />);
});
