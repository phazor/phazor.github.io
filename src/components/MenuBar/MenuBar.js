import React, { Component } from 'react';
import MenuItem from '../MenuItem/MenuItem';
import hamburger from './bars.svg';
import './MenuBar.css';

class MenuBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuExpanded: false
    }
  }

  toggleMenu = () => {
    this.setState((prevState) => ({
      menuExpanded: (!prevState.menuExpanded)
    }))
  }

  render() {
    return (
      <nav className="navigation">
        <div className="wrapper">
          <div onClick={this.toggleMenu} onBlur={this.toggleMenu} className="hamburger">
            <img src={hamburger} alt="Expand Menu"/>
          </div>
          <ul className={"MenuBar " + (this.state.menuExpanded ? "expanded" : "")}>
            <MenuItem toggleMenu={this.toggleMenu} to="/">Home </MenuItem>
            <MenuItem toggleMenu={this.toggleMenu} to="/cloud-chamber">CloudChamber </MenuItem>
            <MenuItem toggleMenu={this.toggleMenu} to="/user-list">UserList </MenuItem>
            <MenuItem toggleMenu={this.toggleMenu} to="/about">About Me </MenuItem>
            <MenuItem toggleMenu={this.toggleMenu} to="/gosh">Contact </MenuItem>
          </ul>
        </div>
      </nav>
    );
  }
}

export default MenuBar;
