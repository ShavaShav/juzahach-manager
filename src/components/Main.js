import React, { Component } from 'react';
import { Grid, Navbar, Nav, NavItem, Col, Row, 
  ButtonToolbar, ToggleButton, ToggleButtonGroup, Well } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logout, setMode } from '../actions';
import DeviceList from './DeviceList';
import RoadMap from './RoadMap';

class Main extends Component {

  // Nav item event keys
  static LOGOUT = 'LOGOUT';

  // Mode
  static LIVE = 'LIVE';
  static HISTORY = 'HISTORY';

  constructor(props) {
    super(props);
    this.handleNavClick = this.handleNavClick.bind(this);
    this.handleModeChange = this.handleModeChange.bind(this);
  }

  handleModeChange(event) {
    switch (event) {
      case Main.LIVE:
        this.props.setMode(Main.LIVE);
        break;
      case Main.HISTORY:
        //this.props.setMode(Main.HISTORY); TODO
        break;
      default:
      // undefined
    }
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
              <Row>
                <DeviceList/>
              </Row>
              <Row>
                <ButtonToolbar>
                  <ToggleButtonGroup type="radio" name="mode" 
                    value={this.props.mode}
                    onChange={this.handleModeChange}>
                    <ToggleButton value={Main.LIVE}>Live</ToggleButton>
                    <ToggleButton value={Main.HISTORY}>History</ToggleButton>
                  </ToggleButtonGroup>
                </ButtonToolbar>
              </Row>
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
    currentUser: state.currentUser,
    mode: state.mode
  }
};

const mapDispatchToProps = {
  logout, setMode
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
