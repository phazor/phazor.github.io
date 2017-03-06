import React, { Component } from 'react';
import { Link } from 'react-router';
import rocket from './assets/rocket.svg';
import './Home.css';

class Home extends Component {
  render() {
    return (
      <div>
        <section className="Home">
          <div className="Home-header">
            <img src={rocket} className="Home-logo" alt="logo" />
            <h2>Tristan Read - Projects</h2>
          </div>
          <div className="Home-intro container">
            <p>The purpose of this site is for me to learn and showcase a few tools. You can find the results as projects in the menu above. Below I have documented the tools used and why.</p>
            <p>For my CV, please check out <Link href="https://phazor.github.io/about-me/" target="_blank">phazor.github.io/about-me</Link>.</p>
            <p>For my blog on IoT, check out <Link href="https://phazor.github.io/blog/" target="_blank">phazor.github.io/blog</Link>.</p>
            <h3>Tools</h3>
            <p>______________</p>
            <h4>style: Milligram</h4>
            <p>This app was styled using <Link href="https://milligram.github.io/" target="_blank">Milligram</Link> as a base. The responsive menu behavior is added by me, as pure CSS.</p>
            <p>Milligram is a CSS framework designed to be a minimal starting point.
              It includes a bunch of css resets as well as default styles for various components.</p>
            <p>Most importantly, it is only 2kB when gzipped.</p>
            <p>______________</p>
            <h4>routing: react-router</h4>
            <p>Routing is performed by <Link href="https://github.com/ReactTraining/react-router" target="_blank">react-router</Link>. The <code>browserHistory</code> routing scheme is used.</p>
            <p>Github Pages needs to be tricked into accepting the routes, this is achieved by a script in the <code>404.html</code>. See <Link href="https://github.com/rafrex/spa-github-pages" target="_blank">https://github.com/rafrex/spa-github-pages</Link> for more detail.</p>
            <p>______________</p>
            <h4>state: redux</h4>
            <p>State is stored with <Link href="https://redux.js.org" target="_blank">redux</Link> in the <Link to="/user-list">UserList</Link> page. There is no ajax yet - so no middleware is used.</p>
            <p>______________</p>
            <h4>build: create-react-app</h4>
            <p>This app is built with <Link href="https://github.com/facebookincubator/create-react-app/" target="_blank">create-react-app</Link>.</p>
            <p>Everything you see has been done without using <code>eject</code>.</p>
            <p>______________</p>
            <h4>deploy: gh-pages script</h4>
            <p>This app is curently hosted on Github Pages. Deployment is done using the <Link href="https://github.com/tschaub/gh-pages" target="_blank">gh-pages</Link> node module.</p>
            <p>______________</p>
            <h4>embedding: iframe-resizer</h4>
            <p><Link href="https://github.com/davidjbradshaw/iframe-resizer" target="_blank">iframe-resizer</Link> is used to make the hosting of 3rd party iframes more secure and prettier.</p>
            <p>See the <Link to="/about">About Me</Link> page for an example.</p>
          </div>
        </section>
      </div>
    )
  }
}

export default Home;
