import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import UserListPage from './UserListPage';
import { Provider } from 'react-redux';

const createFakeStore = fakeData => ({
  getState() {
    return {
      users: {
        userList: []
      }
    };
  },

  subscribe() {
    return 'blah';
  },

  dispatch() {
    return 'blah';
  }
});

it('renders without crashing', () => {
  const userList = [];
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={createFakeStore()}>
      <UserListPage />
    </Provider>
  , div);
});

// Rewrite this test using redux idioms

// it('UserListPage has the .UserList class', () => {
//   const userList = [];
//   const component = shallow(
//     <Provider store={createFakeStore()}>
//       <UserListPage />
//     </Provider>
//   );
//
//   expect(component.is('.UserList')).toBe(true);
// });

// Cannot write a meaningful test on this until
// refs are supported by .shallow()
//
// it('clicking the button runs onClick prop', () => {
//   const count = 1;
//   const userList = [];
//   const onClick = () => { count++; };
//   const component = shallow(
//     <UserList UserList={userList} onClick={onClick} />
//   );
//   expect(count).toEqual(1);
//
//   component.find('button').simulate('click', { stopPropagation: () => undefined });
//
//   expect(count).toEqual(2);
// });
