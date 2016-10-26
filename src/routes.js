// src/routes.js
import React from 'react';
import { Router, Route } from 'react-router';

import App from './views/App/App';
import About from './views/About/About';
import CloudChamber from './components/CloudChamber/CloudChamber'
import Home from './views/Home/Home';
import NotFound from './views/NotFound/NotFound';

const Routes = (props) => (
  <Router {...props}>
    <Route component={App} >
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/cloud-chamber" component={CloudChamber} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
);

export default Routes;
