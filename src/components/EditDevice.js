import React, { Component } from "react";
import { Button, Glyphicon, FormGroup, FormControl, ControlLabel, Modal } from "react-bootstrap";
import { connect } from 'react-redux';
import { editDevice } from '../actions';

class EditDevice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.device.name,
      show: false, // local state of modal
    };

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClose = event => {
    event.stopPropagation(); // dont effect device list
    this.setState({ show: false });
  }

  handleShow = event => {
    event.stopPropagation(); // dont effect device list
    this.setState({ show: true });
  }

  validateForm() {
    return this.state.name.length > 0;
  }

  handleChange = event => {
    event.stopPropagation(); // dont effect device list
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.stopPropagation(); // dont effect device list
    this.props.editDevice(this.props.device.id, {
      name: this.state.name
    });
    
    this.setState({show: false});
  }

  render() {
    return (
      <div>
        <Button className="pull-right" onClick={this.handleShow}>
          <Glyphicon glyph="edit" />
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit {this.props.device.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup controlId="name" bsSize="large">
                <ControlLabel>Name</ControlLabel>
                <FormControl
                  autoFocus
                  type="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
              </FormGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              bsStyle="primary"
              disabled={!this.validateForm()}
              type="submit"
              onClick={this.handleSubmit}
            >
              Save
            </Button>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default connect(null, { editDevice })(EditDevice);
