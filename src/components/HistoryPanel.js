import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatetimeRangePicker from 'react-datetime-range-picker';
import { setHistoryStart, setHistoryEnd, fetchLocationHistory } from '../actions';

class HistoryPanel extends Component {

  constructor(props) {
    super(props);
    this.onStartTimeChange = this.onStartTimeChange.bind(this);
    this.onEndTimeChange = this.onEndTimeChange.bind(this);
  }

  componentWillMount() {
    // Set initial history state
    if (!this.props.history.start || !this.props.history.end) {
      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);
  
      this.props.setHistoryStart(yesterday);
      this.props.setHistoryEnd(today);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentDevice) {
      // If current device changed, grab the history for it
      if (nextProps.currentDevice.id !== this.props.currentDevice.id) {
        this.props.fetchLocationHistory(nextProps.currentDevice.id, 
          this.props.history.start, this.props.history.end);      
      }
    }
  }

  onStartTimeChange(time) {
    // Update global state and fetch new locations
    this.props.setHistoryStart(time);
    this.props.fetchLocationHistory(this.props.currentDevice.id, 
      this.props.history.start, this.props.history.end);
  }

  onEndTimeChange(time) {
    // Update global state and fetch new locations
    this.props.setHistoryEnd(time);
    this.props.fetchLocationHistory(this.props.currentDevice.id, 
      this.props.history.start, this.props.history.end);
  }

  render() {
    if (this.props.currentDevice && this.props.history) {
      return (
        <table>
          <tr>
            <td>
              <h5>Start</h5>
              <h5>End</h5>
            </td>
            <td style={{paddingLeft: '10px'}}>
              <DatetimeRangePicker
                locale='en-US'
                inline={true}
                onEndDateChange={this.onEndTimeChange}
                onStartDateChange={this.onStartTimeChange}
                endDate={this.props.history.end}
                startDate={this.props.history.start}
              />
            </td>
          </tr>
        </table>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => {
  return {
    history: state.history,
    currentDevice: state.currentDevice
  }
};

const mapDispatchToProps = {
  setHistoryStart, setHistoryEnd, fetchLocationHistory
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryPanel);
