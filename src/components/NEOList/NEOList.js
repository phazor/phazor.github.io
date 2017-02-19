import React, { PropTypes } from 'react';

const NEOList = ({ NEOs, lastAction }) => {
  return (
    <div>
      {(lastAction === "FETCH_NEO_SUCCESS")
        ? <div className="ListContainer">
            <ul>
              { NEOs
                .sort((a,b) => a.close_approach_data[0].miss_distance.kilometers - b.close_approach_data[0].miss_distance.kilometers)
                .map((NEO, index) =>
                <li key={index}>Name: {NEO.name}.
                  miss-distance: {Math.round(NEO.close_approach_data[0].miss_distance.kilometers / 6371)} earth radii,
                  length: {Math.round(NEO.estimated_diameter.kilometers.estimated_diameter_max * 1000)} m
                </li>
              )}
            </ul>
          </div>
        : (lastAction === "FETCH_NEO_REQUEST")
        ? <div className="Loading"><h2>Loading...</h2></div>
        : (lastAction === "FETCH_NEO_FAILURE")
        ? <div className="Error"><h2>Error...</h2></div>
        : <div className="Click Fetch"></div>
      }
      </div>
    )
}

NEOList.propTypes = {
  NEOs: PropTypes.array
};

export default NEOList;
