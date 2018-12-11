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
      // Get the current history for any change to history props (times, device)
      if (nextProps.currentDevice.id !== this.props.currentDevice.id
        || nextProps.history.start !== this.props.history.start
        || nextProps.history.end !== this.props.history.end) {
          this.props.fetchLocationHistory(nextProps.currentDevice.id, 
            this.props.history.start, this.props.history.end);
        }
    }
  }

  onStartTimeChange(time) {
    // Update global state and fetch new locations
    this.props.setHistoryStart(time);
  }

  onEndTimeChange(time) {
    // Update global state and fetch new locations
    this.props.setHistoryEnd(time);
  }

  render() {
    if (this.props.currentDevice && this.props.history) {
      return (
        <table>
          <tr>
            <td>
              <h5 style={{paddingBottom: '8px'}}>Start</h5>
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
      return <p>Select a device to view it's history</p>;
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
