import React, { Component } from 'react';
import MenuBar from '../../components/MenuBar/MenuBar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MenuBar></MenuBar>
        <main>
          {this.props.children}
        </main>
      </div>
    );
  }
}

export default App;
