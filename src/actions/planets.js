import { createActions } from 'redux-actions';

const actions = createActions({
  'PLANETS': {
    'FETCH_SKYBOX',
    'TOGGLE_FPS',
    'TOGGLE_HIGH_DPI',
    'TOGGLE_LOADING',
    'TOGGLE_ORBITS',
    'TOGGLE_PAUSED',
    'TOGGLE_SKY',
    'TOGGLE_TIPS'
  }
});

export default actions;
