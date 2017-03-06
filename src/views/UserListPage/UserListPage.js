import React, { Component } from 'react';
import AddUser from '../../components/UserList/AddUser';
import UserListContainer from '../../containers/UserListContainer';
import './UserListPage.css';

class UserListPage extends Component {
  render() {
    return (
      <section className="UserList container">
        <h6>A super basic list in React and redux with presentational and container components</h6>
        <AddUser />
        <UserListContainer />
      </section>
    )
  }
}

export default UserListPage;
