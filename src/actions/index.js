let userIndex = 3; // See initial state in src/reducers/users.js
export const addUser = (name) => {
  return {
    type: 'ADD_USER',
    name: name,
    index: userIndex++
  }
}

export const fetchPlanets_Request = () => ({
  type: 'FETCH_PLANETS_REQUEST'
})

export const fetchPlanets_Failure = reason => ({
  type: 'FETCH_PLANETS_FAILURE',
  error: 'Oops'
})

export const fetchPlanets_Success = json => ({
  type: 'FETCH_PLANETS_SUCCESS',
  results: json.results,
  recievedAt: json.date
})

export const fetchPlanets = planets => {
  let bodies = planets ? planets.join(',') : ''
  return dispatch => {
    // Update state
    dispatch(fetchPlanets_Request())
    // We return a promise to wait for.
    return fetch(`http://www.astro-phys.com/api/de406/states?unit=au&bodies=${bodies}`)
      .then(response => {
        return response.json()
      }
      ).then(json => dispatch(fetchPlanets_Success(json))
      ).catch(reason => dispatch(fetchPlanets_Failure(reason))
      )
  }
}
