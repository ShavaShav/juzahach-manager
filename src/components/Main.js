import React, { Component } from 'react';
import { Grid, Navbar, Nav, NavItem, Col, Well } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logout } from '../actions';
import DeviceList from './DeviceList';
import RoadMap from './RoadMap';

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
        <Grid style={{paddingTop:'80px'}} fluid={true}>
            <Col xs={6} md={3} style={{align: 'center'}}>
              <DeviceList/>
            </Col>
            <Col xs={12} md={9}>
              <Well>
                <RoadMap/>
              </Well>
            </Col>    
        </Grid>
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
