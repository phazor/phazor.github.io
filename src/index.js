import { createHistory } from 'history';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { useRouterHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import shims from './shims';
import 'milligram/dist/milligram.min.css';
// import createLogger from 'redux-logger';

import app from './reducers';
import { addUser } from './actions/users';
import Routes from 'routes';
import './index.css';

// Add shims if required.
shims();

// const loggerMiddleware = createLogger()

let store = createStore(
  app,
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), //TODO: Remove Me
  applyMiddleware(
    thunkMiddleware
    // , loggerMiddleware
  )
);

// Add some initial state
store.dispatch(addUser('Tristan'));
store.dispatch(addUser('Ali'));
store.dispatch(addUser('Snoopy'));

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
