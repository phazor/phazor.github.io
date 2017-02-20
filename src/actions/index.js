let userIndex = 0;
export const addUser = (name) => {
  return {
    type: 'ADD_USER',
    name: name,
    index: userIndex++
  }
}

export const fetchNEO_Request = () => ({
  type: 'FETCH_NEO_REQUEST'
})

export const fetchNEO_Failure = reason => ({
  type: 'FETCH_NEO_FAILURE',
  reason: reason
})

export const fetchNEO_Success = json => ({
  type: 'FETCH_NEO_SUCCESS',
  response: json
})

const oneDayInMilliseconds = 1000 * 60 * 60 * 24;
const dateString = (date) => (`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`)

export const fetchNEO = () => {
  let currentDate = new Date();
  let lastWeek = new Date(currentDate - oneDayInMilliseconds * 6); // We take 6 days, because the API is inclusive of the date range
  return dispatch => {
    // Update state
    dispatch(fetchNEO_Request())
    // We return a promise to wait for.
    // return fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=2017-02-13&end_date=2017-02-19&api_key=DEMO_KEY`)
    return fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${dateString(lastWeek)}&end_date=${dateString(currentDate)}&api_key=DEMO_KEY`)
    // return fetch('http://localhost:3004/NEO')
    // local api: return fetch('http://localhost:3004/search/')
      .then(response => response.json())
      .then(json => dispatch(fetchNEO_Success(json)))
      .catch(reason => dispatch(fetchNEO_Failure(reason)))
  }
}
