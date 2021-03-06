import React, { Component } from 'react';
import MenuItem from '../MenuItem/MenuItem';
import hamburger from './assets/bars.svg';
import github from './assets/github-sign.svg';
import './MenuBar.css';

class MenuBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuExpanded: false
    }

    this.closeMenu = this.closeMenu.bind(this);
  }

  toggleMenu = () => {
    this.setState((prevState) => ({
      menuExpanded: (!prevState.menuExpanded)
    }));
  }

  closeMenu() {
    this.setState((prevState) => ({
      menuExpanded: false
    }));
  }

  render() {
    return (
      <nav className="navigation">
        <div className="wrapper">
          <div className="block" />
          <ul className={"MenuBar " + (this.state.menuExpanded ? "expanded" : "")}>
            <MenuItem handleClick={this.closeMenu} to="/">Home </MenuItem>
            <MenuItem handleClick={this.closeMenu} to="/cloud-chamber">CloudChamber </MenuItem>
            <MenuItem handleClick={this.closeMenu} to="/user-list">UserList </MenuItem>
            <MenuItem handleClick={this.closeMenu} to="/NEOs">NEOs </MenuItem>
            <MenuItem handleClick={this.closeMenu} to="/planets">Planets </MenuItem>
            <MenuItem handleClick={this.closeMenu} to="/about">About Me </MenuItem>
            <MenuItem handleClick={this.closeMenu} to="/💩">404 </MenuItem>
            <MenuItem handleClick={this.closeMenu} href="https://phazor.github.io/blog/">Blog</MenuItem>
          </ul>
          <div onClick={this.toggleMenu} onBlur={this.toggleMenu} className="hamburger-bar">
            <img className="icon" src={hamburger} alt="Expand Menu" />
          </div>
          <div className="gh-item">
            <a href="https://www.github.com/phazor/phazor.github.io">
              <img className="icon" src={github} alt="Github Repo" />
            </a>
          </div>
        </div>
      </nav>
    );
  }
}

export default MenuBar;
