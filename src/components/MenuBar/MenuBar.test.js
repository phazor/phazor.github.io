import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import MenuBar from './MenuBar';

it('Menu Bar renders 7 menu items with no errors', () => {
  const wrapper = shallow(<MenuBar/>);
  expect(wrapper.find('MenuItem').length).toEqual(7);
});

// This runs into the "Invariant Violation: <Link>s rendered outside of a router context cannot navigate."
// error. This is fixed in `react-router` v4.0.0. See https://github.com/ReactTraining/react-router/issues/2051
// TODO: work around issue or re-enable when react-router v4 is released

// Integration test
// it('Clicking on MenuItem calls MenuBar handleClick method', () => {
//   const spy = spyOn(MenuBar.prototype, "closeMenu");
//   console.log(MenuBar.prototype);
//   const wrapper = mount(<MenuBar/>);
//   wrapper.find('Link').first().simulate('click');
//   expect(spy).toHaveBeenCalled();
// });
