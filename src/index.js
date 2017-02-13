import { createHistory } from 'history';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { useRouterHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'

import app from './reducers';
import Routes from 'routes';
import '../node_modules/milligram/dist/milligram.min.css';
import './index.css';

let store = createStore(
  app,
  applyMiddleware(thunkMiddleware)
);

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



import { fetchPlanets, fetchPlanets_Request, fetchPlanets_Success, fetchPlanets_Failure } from './actions'

// Log the initial state
console.log(store.getState().planets)

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
let unsubscribe = store.subscribe(() =>
  console.log(store.getState().planets)
)

// Dispatch some actions
store.dispatch(fetchPlanets(['earth', 'mars'])).then(() =>
  console.log(store.getState().planets)
)

// Stop listening to state updates
unsubscribe()
