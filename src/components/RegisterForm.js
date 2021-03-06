import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { connect } from 'react-redux';
import { register } from '../actions';

class RegisterForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.username.length > 0 
      && /^[0-9a-zA-Z_.-]+$/.test(this.state.username)
      && this.state.email.length > 0 
      && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();

    this.props.register(this.state.username, this.state.email, this.state.password);
  }

  render() {
    const errors = this.props.currentUser ? this.props.currentUser.errors : {};

    return (
      <div className="Register">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="username" bsSize="large" 
            validationState={errors && errors.username ? "error" : null}>
            <ControlLabel>Username</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="email" bsSize="large"
            validationState={errors && errors.email ? "error" : null}>
            <ControlLabel>Email</ControlLabel>
            <FormControl
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large"
            validationState={errors && errors.password ? "error" : null}>
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            bsStyle="primary"
            disabled={!this.validateForm()}
            type="submit"
          >
            Register
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  }
};

export default connect(mapStateToProps, { register })(RegisterForm);
