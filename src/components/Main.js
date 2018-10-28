import React, { Component } from 'react';
import { Grid, Navbar, Nav, NavItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logout } from '../actions';
import AddDevice from './AddDevice';

class Main extends Component {

  // Nav item event keys
  static LOGOUT = 'LOGOUT';

  constructor(props) {
    super(props);
    this.handleNavClick = this.handleNavClick.bind(this);
  }

  handleNavClick(eventKey) {
    switch (eventKey) {
      case Main.LOGOUT:
        this.props.logout();
        break;
      default:
        // undefined
    }
  }

  render() {
    return (
      <div>
      <Navbar inverse fixedTop>
        <Grid>
          <Navbar.Header>
              <Navbar.Brand>
                <a href="./">Edge-Manager</a>
              </Navbar.Brand>
              <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight onSelect={this.handleNavClick}>
              <NavItem>
                {this.props.currentUser.username}
              </NavItem>
              <NavItem eventKey={Main.LOGOUT}>
                Logout
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Grid>
      </Navbar>
      <br/>
      <br/>
      <br/>
      <AddDevice/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  }
};

const mapDispatchToProps = {
  logout
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
