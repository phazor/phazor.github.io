import { connect } from 'react-redux'
import React from 'react';
import { fetchNEO } from '../../actions'

let FetchNEO = ({ dispatch }) => {
  const handleClick = () => {
    dispatch(fetchNEO());
  }

  return (
    <button onClick={handleClick}>Fetch NEOs</button>
  )
}

FetchNEO = connect()(FetchNEO);

export default FetchNEO;
