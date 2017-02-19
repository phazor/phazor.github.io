const initialState = {
  isFetching: false,
  didInvalidate: true,
  lastAction: "NONE",
  reason: '',
  NEOList: {
    element_count: 1,
    near_earth_objects: {
      '2015-09-08': [
        {
          name: "test",
          close_approach_data: [{
            miss_distance: {
              kilometers: 10
            },
          }],
          estimated_diameter: {
            kilometers: {
              estimated_diameter_max: 0.08
            }
          }
        }
      ]
    }
  }
}

const NEO = (state = initialState, action) => {
  switch(action.type) {
    case('FETCH_NEO_REQUEST'):
      return Object.assign({}, {
        lastAction: action.type,
        isFetching: true,
        didInvalidate: false,
        NEOList: state.NEOList,
        reason: ''
      })
    case('FETCH_NEO_SUCCESS'):
      return Object.assign({}, {
        lastAction: action.type,
        isFetching: false,
        didInvalidate: false,
        NEOList: action.response,
        reason: ''
      })
    case('FETCH_NEO_FAILURE'):
      return Object.assign({}, {
        lastAction: action.type,
        isFetching: false,
        didInvalidate: true,
        NEOList: state.NEOList,
        reason: action.reason.stack
      })
    default:
      return state
  }
}

export default NEO
