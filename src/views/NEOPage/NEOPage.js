import React, { Component } from 'react';
import { Link } from 'react-router';
import NEOList from '../../components/NEOList/NEOList';
import FetchNEO from '../../components/NEOList/FetchNEO';
// import './PlanetsPage.css';
// https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=DEMO_KEY
class NEOPage extends Component {
  render() {
    return (
      <section className="NEOList container">
        <h3>Near Earth Objects</h3>
        <p>The purpose of this page is to demonstrate async with Redux Thunk.</p>
        <p>The list below shows the position and size of the closest Near Earth Objects (NEOs) for this week, fetched from NASA's Near Earth Object Web Service <Link href="https://api.nasa.gov/api.html#NeoWS" target="_blank">https://api.nasa.gov/api.html#NeoWS</Link>.</p>
        <p>NEOs are ordered closest-first.</p>
        <FetchNEO />
        <NEOList />
      </section>
    )
  }
}

export default NEOPage;
