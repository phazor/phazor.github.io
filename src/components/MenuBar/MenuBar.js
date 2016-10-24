import React, { Component } from 'react';
import './MenuBar.css';

class MenuBar extends Component {
  render() {
    return (
      <ul className="MenuBar">
        <li><a href="#">Home </a></li>
        <li><a href="#">Projects </a></li>
        <li><a href="#">About Me </a></li>
      </ul>
    );
  }
}

export default MenuBar;
