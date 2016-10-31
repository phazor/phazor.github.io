import React, { Component } from 'react';
import UserList from './UserList';
let nextIndex;

class StatefulThingContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserList :
      [{
        name: 'Tristan',
        index: 0
      },{
        name: 'Ali',
        index: 1
      }]
    }
    nextIndex = 2;
  }

  handleClick = (input) => {
    this.setState((prevState) => ({
      UserList: prevState.UserList.concat({
        name: input,
        index: nextIndex++
      })
    }));
  }

  render() {
    return (
      <UserList UserList={ this.state.UserList } onClick={ this.handleClick }></UserList>
    )
  }
}

export default StatefulThingContainer;
