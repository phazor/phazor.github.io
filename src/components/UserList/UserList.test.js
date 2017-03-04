import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import UserList from './UserList';

let users = [{
    index: 0,
    name: 'Test User 1'
  }, {
    index: 1,
    name: 'Test User 2'
  }];

it('UserList shallow renders with no errors', () => {
  const wrapper = shallow(<UserList users={[]}/>);
});

it('UserList renders list items', () => {
  const wrapper = shallow(<UserList users={users} />);

  expect(wrapper.find('li').length).toEqual(2);
  expect(wrapper.text()).toContain('Test User 1');
  expect(wrapper.text()).toContain('Test User 2');
});
