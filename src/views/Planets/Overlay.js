import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import FPS from './FPS';
import arrow from './arrow.svg';
import Cog from './Cog.js';

class Overlay extends Component {
  constructor(props) {
    super(props);
    this.handleSettingsClick = this.handleSettingsClick.bind(this);
    this.beginSimulation = this.beginSimulation.bind(this);
    this.state = {
      showSettings: false,
      showTips: false,
      showMask: true
    }
  }

  handleSettingsClick() {
    this.setState({ showSettings: !this.state.showSettings });
  }

  beginSimulation() {
    this.setState({ showMask: false });
    this.setState({ showTips: true });
    setTimeout(() => {this.setState({ showTips: false })}, 3000);
  }

  render() {
    const {fps, showFPS, handleClick, settings} = this.props;
    const {showSettings, showTips, showMask} = this.state;

    const items = (showSettings)
      ? Object.values(settings).map((setting, key) => (
          <li key={key}><button onClick={() => {
            this.setState({ showSettings: false });
            setting.handleClick(setting, this);
          }}>
            {setting.text()}
          </button></li>
        ))
      : [];
    return (
      <div>
        <ReactCSSTransitionGroup
          transitionName="begin"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={500}>
          { (showMask) &&
            <div id="0">
              <div className="Mask" />
              <div className="CenteringDiv">
                <button className="Begin" onClick={this.beginSimulation}>Begin Simulation</button>
              </div>
            </div>
          }
        </ReactCSSTransitionGroup>
        <ReactCSSTransitionGroup
          transitionName="tips"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={2000}>
            { (showTips) &&
              <div className="Tips" id="0">
                <p>drag/swipe to rotate</p>
                <p>scroll/pinch to zoom</p>
                <p>tap the cog for settings</p>
              </div>
            }
        </ReactCSSTransitionGroup>
        { (showFPS) &&
          <FPS fps={fps} />
        }
        <Cog className="SettingsCog" onClick={this.handleSettingsClick} />
        <ul className="SettingsList">
          <ReactCSSTransitionGroup
            transitionName="settings"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>
            {items}
          </ReactCSSTransitionGroup>
        </ul>
        <img className="Arrow Up" alt="Jump to top of page" src={arrow} onClick={handleClick} />
      </div>
    )
  }
}

export default Overlay;
