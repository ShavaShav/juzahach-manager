import React, { Component } from 'react';
import { Button, Col, Grid } from 'react-bootstrap';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

class Splash extends Component {

  // Constants for toggling local state
  static LOGIN     = 'Login';
  static REGISTER  = 'Register';

  constructor(props) {
    super(props);

    // Splash defaults to login form
    this.state = { 
      type: Splash.LOGIN 
    };

    this.toggleType = this.toggleType.bind(this);
    this.renderBody = this.renderBody.bind(this);
  }

  toggleType() {
    switch (this.state.type) {
      case Splash.LOGIN:
        this.setState({ type: Splash.REGISTER });
        break;
      case Splash.REGISTER:
      default:
        this.setState({ type: Splash.LOGIN });
    }
  }

  // Show Login form with "Register" button when logging in, and vice versa
  renderBody() {
    switch (this.state.type) {
      case Splash.LOGIN:
        return (
          <div>
            <LoginForm/>
            <br/>
            <Button 
              block
              bsSize="large"
              onClick={this.toggleType}>
              Register
            </Button>
          </div>
        );
      case Splash.REGISTER:
        return (
          <div>
            <RegisterForm/>
            <br/>
            <Button 
              block
              bsSize="large"
              onClick={this.toggleType}>
              Login
            </Button>
          </div>
        );
      default:
        return <p>Oops, we only know how to LOGIN and REGISTER!</p>;
    }
  }

  render() {
    return (
      <Grid>
        <Col>
          <h1 style={{textAlign: 'center'}}>Juzahach Edge-Manager</h1>
          { this.renderBody() }
        </Col>
      </Grid>
    );
  }
}

export default Splash;
