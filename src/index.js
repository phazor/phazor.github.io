import React from 'react';
import ReactDOM from 'react-dom';

import Routes from 'routes';
import '../node_modules/milligram/dist/milligram.min.css';
import './index.css';

import { useRouterHistory } from 'react-router';
import { createHistory } from 'history';

const history = useRouterHistory(createHistory)({
  // Un-Comment if restoring page to Github Pages sub-page
  //basename: '/my-cool-single-page-app'
});

ReactDOM.render(
  <Routes history={history} />,
  document.getElementById('root')
);
