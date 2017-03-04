import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import FetchNEO from './FetchNEO';

let dispatchSpy;
let fakeStore;

beforeEach(function() {
  dispatchSpy = jasmine.createSpy();

  fakeStore = {
    getState: () => ({}),
    subscribe: () => ({}),
    dispatch: dispatchSpy
  };
})

it('component renders a button', () => {
  const wrapper = mount(
    <Provider store={fakeStore}>
      <FetchNEO />
    </Provider>
  );
  expect(wrapper.find('button')).toHaveLength(1)
});

it('component button calls handleClick', () => {
  expect(dispatchSpy.calls.any()).toEqual(false);
  const wrapper = mount(
    <Provider store={fakeStore}>
      <FetchNEO />
    </Provider>
  );
  wrapper.find('button').simulate('click');
  expect(dispatchSpy).toHaveBeenCalled();
});
