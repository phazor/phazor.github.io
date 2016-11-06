import React, { Component } from 'react';
import { Link } from 'react-router';
import rocket from './rocket.svg';
import './Home.css';

class Home extends Component {
  render() {
    return (
      <div>
        <section className="Home">
          <div className="Home-header">
            <img src={rocket} className="Home-logo" alt="logo" />
            <h2>Welcome to React</h2>
          </div>
          <div className="Home-intro container">
            <p>The purpose of this site is for me to learn a few technologies and then showcase them.</p>
            <p>Also contained is my cv, please check out the <Link to="/about">About Me</Link> page.</p>
            <h3>Technologies</h3>
            <p>______________</p>
            <h4>embedding: iframe-resizer</h4>
            <p><a href="https://github.com/davidjbradshaw/iframe-resizer">iframe-resizer</a> is used to make the hosting of 3rd party iframes more secure and prettier.</p>
            <p>See the <Link to="/about">About Me</Link> page for an example.</p>
            <p>______________</p>
            <h4>style: Milligram</h4>
            <p>This app was styled using Milligram.
              It is a CSS framework designed to be a minimal starting point.
              It includes a bunch of css resets as well as default styles for various components.</p>
            <p>Most importantly, it is only 2kB when gzipped.</p>
            <p>______________</p>
            <h4>build: create-react-app</h4>
            <p>This app is built with <a href="https://github.com/facebookincubator/create-react-app/">create-react-app</a>.</p>
            <p>Everything you see has been done without using <code>eject</code>.</p>
            <p>______________</p>
            <h4>deploy: gh-pages script</h4>
            <p>This app is curently hosted on Github Pages. Deployment is done using the <a href="https://github.com/tschaub/gh-pages">gh-pages</a> node module.</p>
            <p>______________</p>
            <h4>routing: react-router</h4>
            <p>Routing is performed by <a href="https://github.com/ReactTraining/react-router">react-router</a>. The <code>browserHistory</code> routing scheme is used.</p>
            <p>Github Pages needs to be tricked into accepting the routes, this is achevied by a script in the <code>404.html</code>. See <a href="https://github.com/rafrex/spa-github-pages">https://github.com/rafrex/spa-github-pages</a> for more detail.</p>
          </div>
        </section>
      </div>
    )
  }
}

export default Home;
