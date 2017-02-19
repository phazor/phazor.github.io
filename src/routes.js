// src/routes.js
import React, { PropTypes } from 'react';
import { Router, Route } from 'react-router';

// Menu Items
import App from 'views/App/App';
import About from 'views/About/About';
import CloudChamber from 'components/CloudChamber/CloudChamber';
import UserListPage from 'views/UserListPage/UserListPage';
import NEOPage from 'views/NEOPage/NEOPage';
import Home from 'views/Home/Home';
import NotFound from 'views/NotFound/NotFound';

const Routes = (props) => (
  <Router {...props}>
    <Route component={App} >
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/cloud-chamber" component={CloudChamber} />
      <Route path="/user-list" component={UserListPage} />
      <Route path="/NEOs" component={NEOPage} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
);

Routes.propTypes = {
  history: PropTypes.object.isRequired
};

export default Routes;
