import React, { Component } from 'react';
import { Link } from 'react-router';
import NEOList from '../../containers/VisibleNEOList';
import FetchNEO from '../../components/NEOList/FetchNEO';
// import './PlanetsPage.css';
// https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=DEMO_KEY
class NEOPage extends Component {
  render() {
    return (
      <section className="NEOList container">
        <h3>Near Earth Objects</h3>
        <h6>The purpose of this page is to demonstrate async with Redux Thunk.</h6>
        <h6>The position of the closest Near Earth Objects (NEOs) for this week, fetched from NASA's Near Earth Object Web Service <Link href="https://api.nasa.gov/api.html#NeoWS" target="_blank">https://api.nasa.gov/api.html#NeoWS</Link>.</h6>
        <h6>NEOs are ranked from closest to farthest away.</h6>
        <FetchNEO />
        <NEOList />
      </section>
    )
  }
}

export default NEOPage;
