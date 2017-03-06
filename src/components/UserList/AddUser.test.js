import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import AddUser from './AddUser';

let fakeStore;
let dispatchSpy;

beforeEach(function() {
  dispatchSpy = jasmine.createSpy();

  fakeStore = {
    getState: () => ({}),
    subscribe: () => ({}),
    dispatch: dispatchSpy
  };
})

it('shallow renders with no errors', () => {
  const wrapper = shallow(
    <Provider store={fakeStore}>
      <AddUser />
    </Provider>
  );
});

it('calls dispatch when button is clicked', () => {
  expect(dispatchSpy.calls.any()).toEqual(false);
  const wrapper = mount(
    <Provider store={fakeStore}>
      <AddUser />
    </Provider>
  );
  wrapper.find('button').simulate('click');
  expect(dispatchSpy).toHaveBeenCalled();
});
