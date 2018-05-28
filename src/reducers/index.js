import { combineReducers } from 'redux';
import NEO from './NEO';
import planets from './planets';
import users from './users';

const app = combineReducers({
  NEO,
  planets,
  users,
});

export default app;
