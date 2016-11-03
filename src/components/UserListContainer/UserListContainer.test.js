import React from 'react';
import ReactDOM from 'react-dom';
import UserListContainer from './UserListContainer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UserListContainer />, div);
});

it('runs the onClick code', () => {

});
