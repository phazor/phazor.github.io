import React, { Component } from 'react';
import AddUser from '../../components/UserList/AddUser';
import VisibleUserList from '../../containers/VisibleUserList';
import './UserListPage.css';

class UserListPage extends Component {
  render() {
    return (
      <section className="UserList container">
        <h6>A super basic list in React and redux with presentational and container components</h6>
        <AddUser />
        <VisibleUserList />
      </section>
    )
  }
}

export default UserListPage;
