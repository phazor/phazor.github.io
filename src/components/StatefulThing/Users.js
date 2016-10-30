import React, { Component } from 'react';
import './StatefulThing.css';

class Users extends Component {
  render() {
    return (
      <section className="Users container">
        <div className="InputArea">
          <input type="text" placeholder="e.g. Mary Jane" ref={node => { this.input = node; }}></input>
          <button onClick={() => {
            this.props.onClick(this.input.value);
            this.input.value = '';
          }}>Go!</button>
        </div>
        <div className="UserList">
          <ul>
            { this.props.users.map((user) => <li key={user.index}>{user.name}</li>) }
          </ul>
        </div>
      </section>
    )
  }
}

export default Users;
