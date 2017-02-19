import React, { PropTypes } from 'react';

const PlanetsList = ({ planets, lastAction }) => {
  return (
    <div>
      {(lastAction === "FETCH_PLANETS_SUCCESS")
        ? <div className="ListContainer">
            <ul>
              { Object.keys(planets).map((planet) =>
                <li key={planet}>Planet: {planet}.
                  x: {planets[planet][0][0]},
                  y: {planets[planet][0][1]},
                  z: {planets[planet][0][2]}
                </li>
              )}
            </ul>
          </div>
        : (lastAction === "FETCH_PLANETS_REQUEST")
        ? <div className="Loading"><h2>Loading...</h2></div>
        : <div className="Click Fetch"><h2>Click 'Fetch Planets'</h2></div>
      }
      </div>
    )
}

PlanetsList.propTypes = {
  planets: PropTypes.object
};

export default PlanetsList;
