import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import FPS from './FPS';
import arrow from './arrow.svg';
import Cog from './Cog.jsx';

class Overlay extends Component {
  constructor(props) {
    super(props);
    this.handleSettingsClick = this.handleSettingsClick.bind(this);
    this.state = {
      showSettings: false,
      showTips: true
    }
  }

  componentDidMount() {
    setTimeout(() => {this.setState({ showTips: false })}, 5000);
  }

  handleSettingsClick() {
    this.setState({ showSettings: !this.state.showSettings });
  }

  render() {
    const {fps, showFPS, handleClick, settings} = this.props;
    const {showSettings, showTips} = this.state;

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
          transitionName="tips"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={5000}>
            { (showTips) &&
              <p id="0" className="Tips">drag/swipe to rotate | scroll/pinch to zoom</p>
            }
        </ReactCSSTransitionGroup>
        { (showFPS) &&
          <FPS fps={fps} />
        }
        <div>
          <Cog className="SettingsCog" onClick={this.handleSettingsClick} />
          <ul className="SettingsList">
            <ReactCSSTransitionGroup
              transitionName="settings"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}>
              {items}
            </ReactCSSTransitionGroup>
          </ul>
        </div>
        <img className="Arrow Up" alt="Jump to top of page" src={arrow} onClick={handleClick} />
      </div>
    )
  }
}

export default Overlay;
