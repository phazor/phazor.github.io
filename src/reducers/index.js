import { combineReducers } from 'redux';
import users from './users';
import planets from './planets';

const app = combineReducers({
  users,
  planets
});

export default app;
