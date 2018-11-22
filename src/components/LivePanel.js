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
        <h5>Updating {this.props.live.updatesPerMin} times per minute</h5>
        <Slider
          value={this.props.live.updatesPerMin}
          onChange={this.handleUpdateSpeedChange}
          max={30}
          min={0}
        />
        <h5 style={{paddingTop: '10px'}}>Following last {this.props.live.trailLength} known locations</h5>
        <Slider
          value={this.props.live.trailLength}
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
    live: state.live
  }
};

const mapDispatchToProps = {
  setLiveTrailLength, setLiveUpdateSpeed
};

export default connect(mapStateToProps, mapDispatchToProps)(LivePanel);