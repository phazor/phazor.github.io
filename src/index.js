import { createHistory } from 'history';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { useRouterHistory } from 'react-router';
import { createStore } from 'redux';

import app from './reducers';
import Routes from 'routes';
import '../node_modules/milligram/dist/milligram.min.css';
import './index.css';

let store = createStore(app);

const history = useRouterHistory(createHistory)({
  // Un-Comment if restoring page to Github Pages sub-page
  //basename: '/my-cool-single-page-app'
});

ReactDOM.render(
  <Provider store={store}>
    <Routes history={history}/>
  </Provider>,
  document.getElementById('root')
);
