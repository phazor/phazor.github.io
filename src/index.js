import React from 'react';
import ReactDOM from 'react-dom';

import Routes from 'routes';
import '../node_modules/milligram/dist/milligram.min.css';
import './index.css';

import { useRouterHistory } from 'react-router';
import { createHistory } from 'history';

const history = useRouterHistory(createHistory)({
  basename: '/my-cool-single-page-app'
});

ReactDOM.render(
  <Routes history={history} />,
  document.getElementById('root')
);
