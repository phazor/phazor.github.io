import { handleActions } from 'redux-actions';

const initial = {
  isLoading: false,
  isPaused: false,
  fetchedSkybox: false,
  showFPS: false,
  showHighDPIScaling: false,
  showOrbits: true,
  showSky: false,
  showTips: true
}

const handlers = {
  PLANETS: {
    FETCH_SKYBOX: state => ({ ...state, fetchedSkybox: true }),
    TOGGLE_FPS: state => ({ ...state, showFPS: !state.showFPS }),
    TOGGLE_HIGH_DPI: state => ({ ...state, showHighDPIScaling: !state.showHighDPIScaling }),
    TOGGLE_LOADING: state => ({ ...state, isLoading: !state.isLoading }),
    TOGGLE_ORBITS: state => ({ ...state, showOrbits: !state.showOrbits }),
    TOGGLE_PAUSED: state => ({ ...state, isPaused: !state.isPaused }),
    TOGGLE_SKY: state => ({ ...state, showSky: !state.showSky }),
    TOGGLE_TIPS: state => ({ ...state, showTips: !state.showTips })
  }
}

export default handleActions(handlers, initial)
