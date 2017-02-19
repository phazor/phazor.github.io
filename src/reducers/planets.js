// Return state from the api
const initialState = {
  lastAction: "NONE",
  isFetching: true,
  didInvalidate: true,
  lastUpdated: 0,
  planetList: {
    date: 2086326.5,
    unit: "km",
    results: {
      mars: [
        [
          -168045229.22750974, // X Position
          164411532.9003423,   // Y Position
          80245103.26520184    // Z Position
        ],
        [
          -1449448.751232047,  // X Velocity
          -1150179.7595137728, // Y Velocity
          -484397.75425069826  // Z Velocity
        ]
      ]
    }
  }
}

// Normalised State
// const initialState = {
//   isFetching: false,
//   didInvalidate: false,
//   selectedPlanets: ['earth', 'mars'],
//   planets: [
//     {
//       id: 'mars'
//       position: {
//         x: 1,
//         y: 1.1,
//         z: 0.002
//       }
//     },
//     {
//       id: 'earth'
//       position: {
//         x: 0.7,
//         y: -65,
//         z:
//       }
//     }
//   ]
// }

const planets = (state = initialState, action) => {
  switch(action.type) {
    case('FETCH_PLANETS_REQUEST'):
      return Object.assign({}, {
        lastAction: action.type,
        isFetching: true,
        didInvalidate: false,
        planetList: state.planetList
      })
    case('FETCH_PLANETS_SUCCESS'):
      return Object.assign({}, {
        lastAction: action.type,
        isFetching: false,
        didInvalidate: false,
        planetList: action,
        lastUpdated: action.recievedAt
      })
    case('FETCH_PLANETS_FAILURE'):
      return Object.assign({}, {
        lastAction: action.type,
        isFetching: false,
        didInvalidate: true,
        planetList: state.planetList
      })
    default:
      return state
  }
}

export default planets
