import React, { Component } from 'react';
import { Link } from 'react-router';
import PlanetsList from '../../containers/VisiblePlanetsList';
import FetchPlanets from '../../components/PlanetsList/FetchPlanets';
// import './PlanetsPage.css';

class PlanetsPage extends Component {
  render() {
    return (
      <section className="PlanetsList container">
        <h6>The position of planets in the solar system, fetched from Nasa's HORIZON system via <Link href="http://www.astro-phys.com/api" target="_blank">http://www.astro-phys.com/api</Link>.</h6>
        <FetchPlanets />
        <PlanetsList />
      </section>
    )
  }
}

export default PlanetsPage;
