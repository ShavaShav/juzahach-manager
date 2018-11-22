import React, { Component } from 'react';
import { Grid, Navbar, Nav, NavItem, Col, Row, Panel,
  ButtonToolbar, ToggleButton, ToggleButtonGroup, Well } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logout, setMode, setLiveTrailLength, setLiveUpdateSpeed } from '../actions';
import DeviceList from './DeviceList';
import LiveMap from './LiveMap';
import LivePanel from './LivePanel';
import HistoryMap from './HistoryMap';
import HistoryPanel from './HistoryPanel';

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
    this.handleUpdateSpeedChange = this.handleUpdateSpeedChange.bind(this);
    this.handleTrailLengthChange = this.handleTrailLengthChange.bind(this);
  }

  handleModeChange(event) {
    switch (event) {
      case Main.LIVE:
        this.props.setMode(Main.LIVE);
        break;
      case Main.HISTORY:
        this.props.setMode(Main.HISTORY); 
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

  handleUpdateSpeedChange(updatesPerMin) {
    this.props.setLiveUpdateSpeed(updatesPerMin);
  }

  handleTrailLengthChange(trailMins) {
    this.props.setLiveTrailLength(trailMins);
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
          <Col md={3} style={{align: 'center'}}>
            <Row>
              <Col xs={12} sm={6} md={12}>
                <DeviceList/>            
              </Col>
              <Col xs={12} sm={6} md={12}>
                <ButtonToolbar style={{marginBottom: '25px'}}>
                  <ToggleButtonGroup type="radio" name="mode" 
                    value={this.props.mode}
                    onChange={this.handleModeChange}
                    style={{width: '100%'}}>
                    <ToggleButton style={{width: '50%'}} value={Main.LIVE}>Live</ToggleButton>
                    <ToggleButton style={{width: '50%'}} value={Main.HISTORY}>History</ToggleButton>
                  </ToggleButtonGroup>
                </ButtonToolbar>
                <Panel style={{padding: '25px'}}>
                  {
                    this.props.mode === Main.LIVE ? <LivePanel/> :
                    this.props.mode === Main.HISTORY ? <HistoryPanel/> :
                    <p>Undefined state! :o</p>
                  }
                </Panel>
              </Col>
            </Row>
          </Col>
          <Col md={9}>
            <Well>
              {
                this.props.mode === Main.LIVE ? <LiveMap/> :
                this.props.mode === Main.HISTORY ? <HistoryMap/> :
                <p>Undefined state! :o</p>
              }
            </Well>
          </Col>    
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    liveMap: state.liveMap,
    currentUser: state.currentUser,
    mode: state.mode
  }
};

const mapDispatchToProps = {
  logout, setMode, setLiveTrailLength, setLiveUpdateSpeed
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
