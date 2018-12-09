import React, { Component } from 'react';
import Slider from 'rc-slider/lib/Slider';
import { connect } from 'react-redux';
import { Button, Glyphicon } from "react-bootstrap";
import { setLiveTrailLength, setLiveUpdateSpeed } from '../actions';

import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

class LivePanel extends Component {

  constructor(props) {
    super(props);
    this.handleUpdateSpeedChange = this.handleUpdateSpeedChange.bind(this);
    this.handleTrailLengthChange = this.handleTrailLengthChange.bind(this);
    this.handleStartLiveTracking = this.handleStartLiveTracking.bind(this);
    this.handleStopLiveTracking = this.handleStopLiveTracking.bind(this);
  }

  handleUpdateSpeedChange(updatesPerMin) {
    this.props.setLiveUpdateSpeed(updatesPerMin);
  }

  handleTrailLengthChange(trailMins) {
    this.props.setLiveTrailLength(trailMins);
  }

  handleStopLiveTracking() {
    this.props.setLiveUpdateSpeed(0);
  }

  handleStartLiveTracking() {
    this.props.setLiveUpdateSpeed(10);
  }

  renderFetchSettings() {
    return (
      <div>
        <h5>Updating {this.props.live.updatesPerMin} times per minute</h5>
        <Slider
          value={this.props.live.updatesPerMin}
          onChange={this.handleUpdateSpeedChange}
          max={60}
          min={1}
        />
        <h5 style={{paddingTop: '10px'}}>Following last {this.props.live.trailLength} known locations</h5>
        <Slider
          value={this.props.live.trailLength}
          onChange={this.handleTrailLengthChange}
          max={250}
          min={1}
        />
      </div>
    )
  }

  render() {
    if (this.props.live.updatesPerMin > 0) {
      return (
        <div>
          <Button block bsStyle="danger" onClick={this.handleStopLiveTracking}>
            <Glyphicon glyph="stop"/> Stop
          </Button>
          <br/>
          { this.renderFetchSettings() }
        </div>
      )
    } else {
      return  (
        <Button block bsStyle="success" onClick={this.handleStartLiveTracking}>
          <Glyphicon glyph="play"/> Track
        </Button>
      )
    }
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