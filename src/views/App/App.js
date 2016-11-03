import React, { Component } from 'react';
import MenuBar from 'components/MenuBar/MenuBar';
import Footer from 'components/Footer/Footer';
import './App.css';

class App extends Component {
  render() {
    return (
      <main className="App wrapper">
        <MenuBar></MenuBar>
        {this.props.children}
        <Footer></Footer>
      </main>
    );
  }
}

export default App;
