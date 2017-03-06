import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import UserListContainer from '../../containers/UserListContainer/'
import UserListPage from './UserListPage';
import { Provider } from 'react-redux';

const createFakeStore = fakeData => ({
  getState: () => ({
    users: {
      userList: []
    }
  }),
  subscribe() {},
  dispatch() {}
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={createFakeStore()}>
      <UserListPage />
    </Provider>
  , div);
});

it('renders the UserListContainer component', () => {
  let wrapper = mount(
    <Provider store={createFakeStore()}>
      <UserListPage />
    </Provider>
  );
  expect(wrapper.find(UserListContainer).length).toEqual(1);
});
