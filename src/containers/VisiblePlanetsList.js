import { connect } from 'react-redux'
import PlanetsList from '../components/PlanetsList/PlanetsList'

const mapStateToProps = ({ planets }) => {
  return {
    planets: planets.planetList.results,
    isFetching: planets.isFetching, // unused, for now
    didInvalidate: planets.didInvalidate, // unused, for now
    lastAction: planets.lastAction
  };
};

const VisiblePlanetsList = connect(
  mapStateToProps
)(PlanetsList);

export default VisiblePlanetsList;
