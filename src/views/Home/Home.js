import React, { Component } from 'react';
import logo from './logo.svg';
import './Home.css';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="Home-header">
          <img src={logo} className="Home-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="Home-intro">
          The purpose of this site is for me to learn and then showcase a few technologies.
        </p>
        <h3>Technologies</h3>
        <h4>create-react-app</h4>
        <p>This app was built with the create-react-app build process</p>
        <p>It features routing, which has been possible without using <code>eject</code>.</p>
        <h4>Styling: Milligram</h4>
        <p>This app was styled using Milligram.
          It is a CSS framework designed to be a minimal starting point.
          It includes a bunch of css resets as well as default styles for various components.
          Most importantly, it is only 2kB when gzipped.</p>
      </div>
    )
  }
}

export default Home;
