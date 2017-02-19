import { connect } from 'react-redux'
import React from 'react';
import { fetchPlanets } from '../../actions'

let FetchPlanets = ({ dispatch }) => {
  const handleClick = () => {
    dispatch(fetchPlanets(['earth', 'mars']));
  }

  return (
    <button onClick={handleClick}>Fetch Planets</button>
  )
}

FetchPlanets = connect()(FetchPlanets);

export default FetchPlanets;
