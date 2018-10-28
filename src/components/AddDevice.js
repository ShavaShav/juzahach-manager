import React, { Component } from 'react';
import { Button, Modal, Well } from 'react-bootstrap';
import { connect } from 'react-redux';

import { registerDevice } from '../actions';

class AddDevice extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.renderModalBody = this.renderModalBody.bind(this);

    this.state = {
      show: false, // local state of modal
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  renderModalBody() {

    let contents = undefined;

    if (!this.props.accessCode) {
      contents = ( 
        <p>Generate a new access code to register a device.</p>
      )
    } else if (this.props.accessCode === 'PENDING') {
      contents = ( 
        <p>Please wait while we make an access code :)</p>
      )
    } else {
      contents = (
        <div>
          <h2>Access Code: <b>{this.props.accessCode}</b></h2>
          <p>Enter the access code on your device to register it to your account.</p>
        </div>
      )
    }
    
    return (
      <div>
        <Well>{ contents }</Well>
      </div>
    )
  }

  render() {
    return (
      <div>
        <Button bsStyle="primary" onClick={this.handleShow}>
          Register New Device
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Register New Device</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            { this.renderModalBody() }
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.registerDevice}>New Access Code</Button>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    accessCode: state.accessCode
  }
};

const mapDispatchToProps = {
  registerDevice
};

export default connect(mapStateToProps, mapDispatchToProps)(AddDevice);
