import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {
  render() {
    return (
      <section className="Footer">
        <ul>
          <li><i><a href="http://www.flaticon.com/free-icon/rocket_178158">Rocket icon</a> from Flaticon</i></li>
          <li className="separator">|</li>
          <li><i><a href="https://www.eso.org/public/images/eso0932a/">Milky Way Panorama</a> by </i>ESO/S. Brunier<i> from Flaticon</i></li>
          <li className="separator">|</li>
          <li>Copyright <i>Tristan Read</i> 2017</li>
        </ul>
      </section>
    )
  }
};

export default Footer;
