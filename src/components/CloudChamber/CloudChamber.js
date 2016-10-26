import React, { Component } from 'react';
import { Parser } from 'html-to-react';
import './CloudChamber.css'

var codePenEmbedString = "<iframe height='500' scrolling='no' src='//codepen.io/phazor-1471862257/embed/xEXbmX/?height=500&theme-id=light&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/phazor-1471862257/pen/xEXbmX/'>Cloud Chamber</a> by phazor (<a href='http://codepen.io/phazor-1471862257'>@phazor-1471862257</a>) on <a href='http://codepen.io'>CodePen</a>.</iframe>"
var htmlToReactParser = new Parser();
var reactComponent = htmlToReactParser.parse(codePenEmbedString);

class CloudChamber extends Component {
  render() {
    return (
      <div className="CloudChamber">
        <h1>Cloud Chamber</h1>
        <p>On of the coolest things in nature is how there are constantly particles whizzing around and through us, yet they are imperceptible to the human senses.</p>
        <p>I wanted to show what particles would look like if we could somehow see them. Fortunately there is already a way, in the <a href="https://en.wikipedia.org/wiki/Cloud_chamber">Cloud Chamber</a>, however no good video footage exists. </p>
        <p>So I set out to create a visualisation of what a Cloud Chamber looks like:</p>
        { reactComponent }
        <p>Particles are generated in the center of the page, with a random velocity</p>
        <p>Particles are under the effect of a magnetic field, and are moving through a medium that slows them down.</p>
        <p>Three types of particles exist:
          <ul>
            <li><i>Alpha</i>, which are heavy and have a positive charge.</li>
            <li><i>Gamma</i>, which are massless and have a no charge.</li>
            <li><i>electrons</i>: which are light and have negative charge.</li>
          </ul>
        </p>
        <p>Decay may happen to a particle at any random point - changing it from one type of particle to another and randomising its new direction.</p>
      </div>
    );
  }
}

export default CloudChamber;
