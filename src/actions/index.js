let userIndex = 3; // See initial state in src/reducers/users.js
export const addUser = (name) => {
  return {
    type: 'ADD_USER',
    name: name,
    index: userIndex++
  }
}

export const fetchPlanets_Request = (planets) => {
  return {
    type: 'FETCH_PLANETS_REQUEST',
    planets
  }
}

export const fetchPlanets_Failure = (planets) => {
  return {
    type: 'FETCH_PLANETS_FAILURE',
    planets,
    error: 'Oops'
  }
}

export const fetchPlanets_Success = (planets, json) => {
  return {
    type: 'FETCH_PLANETS_SUCCESS',
    planets,
    response: json,
    recievedAt: Date.now()
  }
}
