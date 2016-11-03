import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import UserList from './UserList';

it('renders without crashing', () => {
  const userList = [];
  const div = document.createElement('div');
  ReactDOM.render(<UserList UserList={userList}/>, div);
});

it('UserList is selectable with the .UserList class', () => {
  const userList = [];
  const component = shallow(
    <UserList UserList={userList} />
  );

  expect(component.is('.UserList')).toBe(true);
});

// Cannot write a meaningful test on this until
// refs are supported by .shallow()

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
