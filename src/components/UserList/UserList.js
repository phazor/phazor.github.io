import React, { Component } from 'react';
import './UserList.css';

class UserList extends Component {
  render() {
    return (
      <section className="UserList container">
        <h6>Messing around with React functional and presentational components</h6>
        <div className="InputArea">
          <input type="text" autoFocus placeholder="e.g. Mary Jane" ref={node => { this.input = node; }}></input>
          <button onClick={() => {
            this.props.handleClick(this.input.value);
            this.input.value = '';
            this.input.focus();
          }}>Go!</button>
        </div>
        <div className="ListContainer">
          <ul>
            { this.props.UserList.map((user) => <li key={user.index}>{user.name}</li>) }
          </ul>
        </div>
      </section>
    )
  }
}

export default UserList;
