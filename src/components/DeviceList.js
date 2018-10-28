import React, { Component } from 'react';
import { Button, Grid, Col, ListGroup, ListGroupItem, Glyphicon } from 'react-bootstrap';
import { connect } from 'react-redux';
import AddDevice from './AddDevice';

import { fetchDeviceList, fetchDevice } from '../actions';

class DeviceList extends Component {

  handleClick = (e) => {
    // this.props.fetchDevice(e.target.id);
  }

  renderDeviceList() {
    return (
      <ListGroup>
        { this.props.deviceList.map(device => (
          <ListGroupItem id={device.id} onClick={this.onDeviceClick}>
            {device.name}
          </ListGroupItem>
        ))}
      </ListGroup>
    )
  }
  
  render() {
    return (
      <Grid>
        <Col>
          <AddDevice/>
          { this.renderDeviceList() }
          <Button onClick={this.props.fetchDeviceList}>
            <Glyphicon glyph="refresh" />
          </Button>
        </Col>
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  return {
    deviceList: state.deviceList || []
  }
};

const mapDispatchToProps = {
  fetchDeviceList, fetchDevice
};

export default connect(mapStateToProps, mapDispatchToProps)(DeviceList);