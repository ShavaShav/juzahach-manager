import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { connect } from 'react-redux';
import { login } from '../actions';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };

  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();

    this.props.login(this.state.email, this.state.password);
  }

  render() {
    const errors = this.props.currentUser ? this.props.currentUser.errors : {};

    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large"
            validationState={errors && errors.email ? "error" : null}>
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large"
            validationState={errors && errors.password ? "error" : null}>
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
            <FormControl.Feedback />
          </FormGroup>
          <Button
            block
            bsSize="large"
            bsStyle="primary"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
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

export default connect(mapStateToProps, { login })(LoginForm);
