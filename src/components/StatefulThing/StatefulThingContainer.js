import React, { Component } from 'react';
import Users from './Users';
let nextIndex;

class StatefulThingContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users :
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

  componentDidMount = () => {
    console.log('suuup');
    this.someRandomMethod();
  }

  someRandomMethod = () => {
    console.log('weee');
  }

  handleClick = (input) => {
    this.setState((prevState) => ({
      users: prevState.users.concat({
        name: input,
        index: nextIndex++
      })
    }));
  }

  render() {
    return (
      <Users users={ this.state.users } onClick={ this.handleClick }></Users>
    )
  }
}

export default StatefulThingContainer;
