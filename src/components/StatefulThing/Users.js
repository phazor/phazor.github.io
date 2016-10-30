import React, { Component } from 'react';
import './StatefulThing.css';

class Users extends Component {
  render() {
    return (
      <div className="Users">
        <input className="input" ref={node => { this.input = node; }}></input>
        <button onClick={() => {
          this.props.onClick(this.input.value);
          this.input.value = '';
        }}>Go!</button>
        { this.props.users.map((user) => <li key={user.index}>{user.name}</li>) }
      </div>
    )
  }
}

export default Users;
