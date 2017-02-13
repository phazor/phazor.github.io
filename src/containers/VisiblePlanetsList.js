import { connect } from 'react-redux'
import Planets from '../components/PlanetsList/PlanetsList'

const mapStateToProps = (state) => {
  return {
    planets: state.planets.planetsList.results
  };
};

const VisiblePlanetsList = connect(
  mapStateToProps
)(PlanetsList);

export default VisiblePlanetsList;
