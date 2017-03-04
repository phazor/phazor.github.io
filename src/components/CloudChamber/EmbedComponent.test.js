import React from 'react';
import ReactDOM from 'react-dom';
import EmbedComponent from './EmbedComponent';

var codePenEmbedString = "<iframe height='500' scrolling='no' src='//codepen.io/phazor-1471862257/embed/xEXbmX/?height=500&theme-id=light&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/phazor-1471862257/pen/xEXbmX/'>Cloud Chamber</a> by phazor (<a href='http://codepen.io/phazor-1471862257'>@phazor-1471862257</a>) on <a href='http://codepen.io'>CodePen</a>.</iframe>"

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EmbedComponent embedString={codePenEmbedString}/>, div);
});
