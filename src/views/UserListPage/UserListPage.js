import React, { Component } from 'react';
import AddUser from '../../components/UserList/AddUser';
import VisibleUserList from '../../containers/VisibleUserList';
import './UserListPage.css';

class UserListPage extends Component {
  render() {
    return (
      <section className="UserList container">
        <h6>Messing around with React functional and presentational components</h6>
        <AddUser />
        <VisibleUserList />
      </section>
    )
  }
}

export default UserListPage;
