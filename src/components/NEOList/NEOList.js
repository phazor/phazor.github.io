import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

let NEOList = ({ NEOs, lastAction }) => {
  return (
    <div>
      {(lastAction === "FETCH_NEO_SUCCESS")
        ? <div className="ListContainer">
            <ul>
              { NEOs
                .sort((a,b) => a.close_approach_data[0].miss_distance.kilometers - b.close_approach_data[0].miss_distance.kilometers)
                .map((NEO, index) =>
                <li key={index}>Name: {NEO.name}.
                  miss-distance: {Math.round(NEO.close_approach_data[0].miss_distance.kilometers / 12742)} earth diameters,
                  length: {Math.round(NEO.estimated_diameter.kilometers.estimated_diameter_max * 1000)} m
                </li>
              )}
            </ul>
          </div>
        : (lastAction === "FETCH_NEO_REQUEST")
        ? <div className="Loading"><h2>Loading...</h2></div>
        : (lastAction === "FETCH_NEO_FAILURE")
        ? <div className="Error"><h2>Error...</h2></div>
        : <div></div>
      }
      </div>
    )
}

NEOList.propTypes = {
  NEO: PropTypes.object
};

// Redux Wiring
// Note: Connecting the Component in this file means we can't test the un-reduxed
// Component in isolation. May not be important, but something to be aware of

// Concatenate paginated NEOs into a single level
const flatten = (list) => (
  Object.keys(list.near_earth_objects)
    .map(key => list.near_earth_objects[key])
    .reduce((a,b) => a.concat(b))
)

// const mapStateToProps = ({ NEO }) => {
const mapStateToProps = ({ NEO }) => {
  return {
    elementCount: NEO.NEOList.elementCount,
    NEOs: flatten(NEO.NEOList),
    isFetching: NEO.isFetching, // unused, for now
    didInvalidate: NEO.didInvalidate, // unused, for now
    lastAction: NEO.lastAction
  };
};

NEOList = connect(
  mapStateToProps
)(NEOList);

export default NEOList;
