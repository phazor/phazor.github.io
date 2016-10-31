import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {
  render() {
    return (
      <section className="Footer">
        <ul>
          <li><i><a href="http://www.flaticon.com/free-icon/rocket_178158">Rocket icon</a> designed by </i>Flat Icons<i> from Flaticon</i></li>
          <li className="separator">|</li>
          <li>Copyright <i>Tristan Read</i> 2016</li>
        </ul>
      </section>
    )
  }
};

export default Footer;
