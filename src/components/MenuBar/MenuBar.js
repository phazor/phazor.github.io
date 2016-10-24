import React, { Component } from 'react';
import './MenuBar.css';

class MenuBar extends Component {
  render() {
    return (
      <nav className="navigation">
        <ul className="MenuBar">
          <li><a href="#">Home </a></li>
          <li><a href="#">Projects </a></li>
          <li><a href="#">About Me </a></li>
          <li><a href="#">Contact </a></li>
        </ul>
      </nav>
    );
  }
}

export default MenuBar;
