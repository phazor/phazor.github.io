import React, { Component } from 'react';
import MenuBar from '../../components/MenuBar/MenuBar';

class App extends Component {
  render() {
    return (
      <main className="App wrapper">
        <MenuBar></MenuBar>
        {this.props.children}
      </main>
    );
  }
}

export default App;
