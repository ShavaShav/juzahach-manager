import React, { Component } from 'react';
import { Button, ListGroup, ListGroupItem, Glyphicon, ButtonGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import AddDevice from './AddDevice';
import EditDevice from './EditDevice';

import { fetchDeviceList, setCurrentDevice } from '../actions';

class DeviceList extends Component {

  componentDidMount() {
    this.props.fetchDeviceList();
  }

  handleClick = device => e => {
    this.props.setCurrentDevice(device);
  }

  renderDeviceList() {
    const currentDeviceId = this.props.currentDevice ? this.props.currentDevice.id : -1;
    console.log(currentDeviceId);
    return (
      <ListGroup>
        { this.props.deviceList.map(device => (
          <ListGroupItem 
            bsStyle={currentDeviceId===device.id?"info":""} // highlight selected
            className="clearfix" 
            key={device.id} 
            onClick={this.handleClick(device)}
            >
            {device.name}
            <EditDevice className="pull-right" device={device} />
          </ListGroupItem>
        ))}
      </ListGroup>
    )
  }
  
  render() {
    return (
      <div>
        <ButtonGroup style={{
          display: 'flex', 
          justifyContent: 'space-between', 
          marginBottom: '25px'
        }}>
          <AddDevice/>
          <Button style={{width: '150px'}} onClick={this.props.fetchDeviceList}>
            <Glyphicon glyph="refresh" />
          </Button>
        </ButtonGroup>
        { this.renderDeviceList() }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    deviceList: state.deviceList || [],
    currentDevice: state.currentDevice
  }
};

const mapDispatchToProps = {
  fetchDeviceList, setCurrentDevice
};

export default connect(mapStateToProps, mapDispatchToProps)(DeviceList);