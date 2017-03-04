import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import AddUser from './AddUser';

let fakeStore;

beforeEach(function() {
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
    dispatch: () => ({})
  };
})

it('component shallow renders with no errors', () => {
  const wrapper = shallow(
    <Provider store={fakeStore}>
      <AddUser />
    </Provider>
  );
});

it('component renders with no errors', () => {
  const wrapper = mount(
    <Provider store={fakeStore}>
      <AddUser />
    </Provider>
  );
});
