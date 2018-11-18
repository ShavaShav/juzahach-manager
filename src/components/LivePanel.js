import React, { Component } from 'react';
import Slider from 'rc-slider/lib/Slider';
import { connect } from 'react-redux';
import { setLiveTrailLength, setLiveUpdateSpeed } from '../actions';

import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

class LivePanel extends Component {

  constructor(props) {
    super(props);
    this.handleUpdateSpeedChange = this.handleUpdateSpeedChange.bind(this);
    this.handleTrailLengthChange = this.handleTrailLengthChange.bind(this);
  }

  handleUpdateSpeedChange(updatesPerMin) {
    this.props.setLiveUpdateSpeed(updatesPerMin);
  }

  handleTrailLengthChange(trailMins) {
    this.props.setLiveTrailLength(trailMins);
  }

  render() {
    return (
      <div>
        <h5>Updating {this.props.liveMap.updatesPerMin} times per minute</h5>
        <Slider
          value={this.props.liveMap.updatesPerMin}
          onChange={this.handleUpdateSpeedChange}
          max={30}
          min={0}
        />
        <h5>Following last {this.props.liveMap.trailLength} known locations</h5>
        <Slider
          value={this.props.liveMap.trailLength}
          onChange={this.handleTrailLengthChange}
          max={100}
          min={1}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    liveMap: state.liveMap
  }
};

const mapDispatchToProps = {
  setLiveTrailLength, setLiveUpdateSpeed
};

export default connect(mapStateToProps, mapDispatchToProps)(LivePanel);