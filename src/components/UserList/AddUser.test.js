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
    getState: () => ({
      NEO: {
        NEOList: {
          near_earth_objects: [[]]
        },
        lastAction: ""
      },
    }),
    subscribe: () => ({}),
    dispatch: dispatchSpy
  };
})

it('AddUser shallow renders with no errors', () => {
  const wrapper = shallow(
    <Provider store={fakeStore}>
      <AddUser />
    </Provider>
  );
});

it('AddUser button click calls dispatch', () => {
  expect(dispatchSpy.calls.any()).toEqual(false);
  const wrapper = mount(
    <Provider store={fakeStore}>
      <AddUser />
    </Provider>
  );
  wrapper.find('button').simulate('click');
  expect(dispatchSpy).toHaveBeenCalled();
});
