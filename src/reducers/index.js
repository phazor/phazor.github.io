import { combineReducers } from 'redux';
import users from './users';
import NEO from './NEO';

const app = combineReducers({
  users,
  NEO
});

export default app;
