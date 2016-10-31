import React, { Component } from 'react';
import { Link } from 'react-router';
import './MenuBar.css';

class MenuBar extends Component {
  render() {
    return (
      <nav className="navigation">
        <ul className="MenuBar">
          <li><Link to="/">Home </Link></li>
          <li><Link to="/cloud-chamber">CloudChamber </Link></li>
          <li><Link to="/user-list">UserList </Link></li>
          <li><Link to="/about">About Me </Link></li>
          <li><Link to="/gosh">Contact </Link></li>
        </ul>
      </nav>
    );
  }
}

export default MenuBar;
